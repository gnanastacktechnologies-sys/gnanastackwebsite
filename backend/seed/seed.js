import dotenv from 'dotenv';
import { connectDB } from '../config/db.js';
import { User } from '../models/User.js';
import { CompanyInfo } from '../models/CompanyInfo.js';
import { Project } from '../models/Project.js';
import { defaultCompanyInfo } from '../controllers/companyController.js';
import { sampleProjects } from '../controllers/projectController.js';

dotenv.config();

const seedDB = async () => {
  const isConnected = await connectDB();
  if (!isConnected) {
    console.log('[Seed]: Skipping database seed as MongoDB is offline.');
    process.exit(0);
  }

  try {
    // 1. Seed Admin User
    const adminEmail = process.env.ADMIN_EMAIL || 'gnanastacktechnologies@gmail.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'Gnana@123';

    await User.deleteMany({ email: adminEmail });
    await User.create({
      name: 'GnanaStack Admin',
      email: adminEmail,
      password: adminPassword,
      role: 'admin',
    });
    console.log(`[Seed Success]: Admin user account created/updated (${adminEmail}).`);

    // 2. Ensure Company Info initialized if empty
    const existingCompany = await CompanyInfo.findOne({});
    if (!existingCompany) {
      await CompanyInfo.create(defaultCompanyInfo);
      console.log('[Seed Success]: Company contact info initialized.');
    }

    // 3. Ensure Projects initialized if empty in MongoDB Atlas
    const projectCount = await Project.countDocuments({});
    if (projectCount === 0) {
      const projectsToInsert = sampleProjects.map(({ _id, ...rest }) => rest);
      await Project.insertMany(projectsToInsert);
      console.log('[Seed Success]: Default projects (GVehicle, GDairy, WebVault) populated into MongoDB Atlas.');
    } else {
      console.log(`[Seed Info]: MongoDB Atlas already contains ${projectCount} project(s).`);
    }

    console.log('[Seed Complete]: Database successfully initialized.');
    process.exit(0);
  } catch (error) {
    console.error(`[Seed Error]: ${error.message}`);
    process.exit(1);
  }
};

seedDB();
