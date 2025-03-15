const { dynamoDB, TABLE_NAME } = require("../Config/aws.config");
const formSchema = require("../Models/User_model");
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SEND_GRID_API_KEY);


exports.create_user = async (req, res) => {
    try {

        const formData = {
            ...req.body,
        };


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
                            color: #212121;
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
                            background-color: #212121;
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
                            <td>${formData.firstName}</td>
                        </tr>
                        <tr>
                            <td>Last Name</td>
                            <td>${formData.lastName}</td>
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
                            <td>Email</td>
                            <td>${formData.Email}</td>
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
                            <td>Driver's License No.</td>
                            <td>${formData.driversLicenseNo}</td>
                        </tr>
                        <tr>
                            <td>State Issued</td>
                            <td>${formData.stateIssued}</td>
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
                        <tr>
                            <td>Emergency Contact</td>
                            <td>${formData.emergencyContact}</td>
                        </tr>
                        <tr>
                            <td>Emergency Contact Address</td>
                            <td>${formData.emergencyContactAddress}</td>
                        </tr>
                        <tr>
                            <td>Emergency Contact Phone</td>
                            <td>${formData.emergencyContactPhone}</td>
                        </tr>
                        <tr>
                            <td>Medical Problems</td>
                            <td>${formData.medicalProblems}</td>
                        </tr>
                        <tr>
                            <td>Medical Medication</td>
                            <td>${formData.medicalMedication}</td>
                        </tr>
                        <tr>
                            <td>Psychiatric Disorder</td>
                            <td>${formData.psychiatricDisorder}</td>
                        </tr>
                        <tr>
                            <td>Psychiatric Medication</td>
                            <td>${formData.psychiatricMedication}</td>
                        </tr>
                        <tr>
                            <td>Alcohol/Drug History</td>
                            <td>${formData.alcoholDrugHistory}</td>
                        </tr>
                        <tr>
                            <td>Primary Drugs Used</td>
                            <td>${formData.primaryDrugsUsed}</td>
                        </tr>
                        <tr>
                            <td>Treatment Attendance</td>
                            <td>${formData.treatmentAttendance}</td>
                        </tr>
                        <tr>
                            <td>Education</td>
                            <td>${formData.education}</td>
                        </tr>
                        <tr>
                            <td>Military Service</td>
                            <td>${formData.militaryService}</td>
                        </tr>
                        <tr>
                            <td>Employment History</td>
                            <td>${formData.employmentHistory}</td>
                        </tr>
                        <tr>
                            <td>Incarceration History</td>
                            <td>${formData.incarcerationHistory}</td>
                        </tr>
                        <tr>
                            <td>Current/Pending Charges</td>
                            <td>${formData.currentPendingCharges}</td>
                        </tr>
                        <tr>
                            <td>Past Convictions</td>
                            <td>${formData.pastConvictions}</td>
                        </tr>
                        <tr>
                            <td>Probation/Parole</td>
                            <td>${formData.probationParole}</td>
                        </tr>
                        <tr>
                            <td>Probation Officer Name</td>
                            <td>${formData.probationOfficerName}</td>
                        </tr>
                        <tr>
                            <td>Probation Officer Phone</td>
                            <td>${formData.probationOfficerPhone}</td>
                        </tr>
                        <tr>
                            <td>Last Company Name</td>
                            <td>${formData.lastCompanyName}</td>
                        </tr>
                        <tr>
                            <td>Last Company Address</td>
                            <td>${formData.lastCompanyAddress}</td>
                        </tr>
                        <tr>
                            <td>Employment From</td>
                            <td>${formData.employmentFrom}</td>
                        </tr>
                        <tr>
                            <td>Employment To</td>
                            <td>${formData.employmentTo}</td>
                        </tr>
                        <tr>
                            <td>Reason for Leaving</td>
                            <td>${formData.reasonForLeaving}</td>
                        </tr>
                        <tr>
                            <td>Number of Jobs in Last 5 Years</td>
                            <td>${formData.numberOfJobsInLastFiveYears}</td>
                        </tr>
                        <tr>
                            <td>Future Employment Plans</td>
                            <td>${formData.futureEmploymentPlans}</td>
                        </tr>
                        <tr>
                            <td>Job Skills</td>
                            <td>${formData.jobSkills}</td>
                        </tr>
                        <tr>
                            <td>Number of Schools Attended</td>
                            <td>${formData.numberOfSchoolsAttended}</td>
                        </tr>
                        <tr>
                            <td>Name of Recent School</td>
                            <td>${formData.schoolPlace}</td>
                        </tr>
                        <tr>
                            <td>Date of Completion</td>
                            <td>${formData.schoolYear}</td>
                        </tr>
                        <tr>
                            <td>Highest Grade Completed</td>
                            <td>${formData.lastGradeCompleted}</td>
                        </tr>
                        <tr>
                            <td>College/Trade School Degree</td>
                            <td>${formData.collegeTradeSchoolDegree}</td>
                        </tr>
                        <tr>
                            <td>Served in Military</td>
                            <td>${formData.servedInMilitary}</td>
                        </tr>
                        <tr>
                            <td>Number of Years Served</td>
                            <td>${formData.militaryYears}</td>
                        </tr>
                        <tr>
                            <td>Military Branch</td>
                            <td>${formData.militaryBranch}</td>
                        </tr>
                        <tr>
                            <td>Type of Discharge</td>
                            <td>${formData.typeOfDischarge}</td>
                        </tr>
                    </table>
                </body>
            </html>
        `;

        const msg = {
            to: process.env.SENDER_EMAIL,
            from: process.env.SENDER_EMAIL,
            subject: `${formData.firstName} ${formData.lastName} Filled the Pre-Screen Form`,
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

exports.sendMessage = async (req, res) => {
    const { email, phone, message } = req.body;

    if (!email || !message) {
        return res.status(400).json({ error: "Email and message are required." });
    }

    const msg = {
        to: process.env.SENDER_EMAIL,
        from: process.env.SENDER_EMAIL,
        subject: "New Message from Metamorphosis Supportive Housing Website",
        text: `
        Email: ${email}
        Phone: ${phone || "Not provided"}
        Message: ${message}
      `,
        html: `
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    };

    try {
        await sgMail.send(msg);
        res.status(200).json({ message: "Message sent successfully!" });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ error: "Failed to send message. Please try again." });
    }
};

