const { dynamoDB, TABLE_NAME } = require("../Config/aws.config");
const formSchema = require("../Models/User_model");
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

exports.create_user = async (req, res) => {
    try {
        const formData = {
            ben: "uniquePartitionKeyValue", 
            userId: new Date().getTime().toString(), 
            ...req.body, 
        };

        const params = {
            TableName: TABLE_NAME,
            Item: formData,
        };

        await dynamoDB.put(params).promise();
        const htmlContent = `
            <html>
                <head>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            background-color: #f4f4f4;
                            color: #333;
                            padding: 20px;
                        }
                        h1 {
                            color: #4CAF50;
                        }
                        table {
                            width: 100%;
                            border-collapse: collapse;
                            margin-top: 20px;
                        }
                        table, th, td {
                            border: 1px solid #ddd;
                        }
                        th, td {
                            padding: 12px;
                            text-align: left;
                        }
                        th {
                            background-color: #4CAF50;
                            color: white;
                        }
                        tr:nth-child(even) {
                            background-color: #f2f2f2;
                        }
                    </style>
                </head>
                <body>
                    <h1>New Person Filled the Pre-Screen Form</h1>
                    <p>Here are the details of the person:</p>
                    <table>
                        <tr>
                            <th>Field</th>
                            <th>Value</th>
                        </tr>
                        <tr>
                            <td>First Name</td>
                            <td>${formData.FirstName}</td>
                        </tr>
                        <tr>
                            <td>Last Name</td>
                            <td>${formData.LastName}</td>
                        </tr>
                        <tr>
                            <td>User ID</td>
                            <td>${formData.userId}</td>
                        </tr>
                        <tr>
                            <td>Birth Date</td>
                            <td>${formData.birthDate}</td>
                        </tr>
                        <tr>
                            <td>Social Security No.</td>
                            <td>${formData.socialSecurityNo}</td>
                        </tr>
                        <tr>
                            <td>Referring Agency</td>
                            <td>${formData.referringAgency}</td>
                        </tr>
                        <tr>
                            <td>Treatment Center</td>
                            <td>${formData.treatmentCenter}</td>
                        </tr>
                        <tr>
                            <td>Last Residence</td>
                            <td>${formData.lastResidence}</td>
                        </tr>
                        <tr>
                            <td>Marital Status</td>
                            <td>${formData.maritalStatus}</td>
                        </tr>
                        <tr>
                            <td>Number of Children</td>
                            <td>${formData.numberOfChildren}</td>
                        </tr>
                        <tr>
                            <td>Next of Kin</td>
                            <td>${formData.nextOfKin}</td>
                        </tr>
                        <tr>
                            <td>Next of Kin Address</td>
                            <td>${formData.nextOfKinAddress}</td>
                        </tr>
                        <tr>
                            <td>Next of Kin Phone</td>
                            <td>${formData.nextOfKinPhone}</td>
                        </tr>
                    </table>
                </body>
            </html>
        `;
        
        const msg = {
            to: process.env.RECEIVER_EMAIL,
            from: process.env.SENDER_EMAIL, 
            subject: "New Person Filled the Pre-Screen Form",
            html: htmlContent, 
        };

        await sgMail.send(msg)
            .then(() => {
                console.log("Email sent successfully!");
            })
            .catch((error) => {
                console.error("Error sending email:", error.response.body);
            });

        res.status(201).json({ message: "Form data saved successfully and email sent!", data: formData });
    } catch (error) {
        console.error("Error saving form data or sending email:", error);

        if (error.response) {
            console.error("SendGrid Error Response:", error.response.body);
        }

        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
};


exports.get_all_users = async (req, res) => {
    try {
        const params = {
            TableName: TABLE_NAME,
        };

        const data = await dynamoDB.scan(params).promise();

        res.status(200).json({ users: data.Items });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};



exports.get_users_by_name = async (req, res) => {
    try {
        const { name } = req.query; 
        if (!name || name.trim() === '') {
            return res.status(400).json({ error: "Name query parameter is required" });
        }

        const params = {
            TableName: TABLE_NAME,
            FilterExpression: 'contains(#name, :name)',  
            ExpressionAttributeNames: {
                '#name': 'name', 
            },
            ExpressionAttributeValues: {
                ':name': name, 
            },
        };

        const data = await dynamoDB.scan(params).promise();

        const users = data.Items.map(user => ({
            userId: user.userId,
            name: user.name,
            birthDate: user.birthDate,
        }));

        res.status(200).json({ users });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
