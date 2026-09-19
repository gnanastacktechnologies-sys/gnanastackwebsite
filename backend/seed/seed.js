import dotenv from 'dotenv';
import { connectDB } from '../config/db.js';
import { User } from '../models/User.js';
import { CompanyInfo } from '../models/CompanyInfo.js';
import { defaultCompanyInfo } from '../controllers/companyController.js';

dotenv.config();

const seedAdminOnly = async () => {
  const isConnected = await connectDB();
  if (!isConnected) {
    console.log('[Seed]: Skipping database seed as MongoDB is offline.');
    process.exit(0);
  }

  try {
    // 1. Seed Admin User Only
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

    console.log('[Seed Complete]: Only Admin credentials initialized. Projects and Services are managed strictly via Admin CMS.');
    process.exit(0);
  } catch (error) {
    console.error(`[Seed Error]: ${error.message}`);
    process.exit(1);
  }
};

seedAdminOnly();
