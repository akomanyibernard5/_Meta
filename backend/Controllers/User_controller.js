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

        const msg = {
            to: process.env.RECEIVER_EMAIL,
            from: process.env.SENDER_EMAIL, 
            subject: 'New User Created',
            text: `A new user has been created with the following details:\n\n
                User ID: ${formData.userId}\n
                Birth Date: ${formData.birthDate}\n
                Social Security No.: ${formData.socialSecurityNo}\n
                Referring Agency: ${formData.referringAgency}\n
                Treatment Center: ${formData.treatmentCenter}\n
                Last Residence: ${formData.lastResidence}\n
                Marital Status: ${formData.maritalStatus}\n
                Number of Children: ${formData.numberOfChildren}\n
                Next of Kin: ${formData.nextOfKin}\n
                Next of Kin Address: ${formData.nextOfKinAddress}\n
                Next of Kin Phone: ${formData.nextOfKinPhone}\n`
        };

        await sgMail.send(msg); 

        res.status(201).json({ message: "Form data saved successfully and email sent!", data: formData });
    } catch (error) {
        console.error("Error saving form data or sending email:", error);
        res.status(500).json({ error: "Internal Server Error" });
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
        const { name } = req.query; // Get the search query (name)
        if (!name || name.trim() === '') {
            return res.status(400).json({ error: "Name query parameter is required" });
        }

        const params = {
            TableName: TABLE_NAME,
            FilterExpression: 'contains(#name, :name)',  // Filter based on name
            ExpressionAttributeNames: {
                '#name': 'name', // Assuming the attribute is 'name'
            },
            ExpressionAttributeValues: {
                ':name': name,  // Search term
            },
        };

        const data = await dynamoDB.scan(params).promise();

        // Map the results to only include the required fields
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
