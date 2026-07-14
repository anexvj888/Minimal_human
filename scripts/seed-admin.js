const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, '../.env') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('Error: MONGODB_URI is not defined in .env');
  process.exit(1);
}

// Minimal User schema for seeding
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', userSchema);

async function seedAdmin() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI, { family: 4 });
    console.log('Connected to MongoDB.');

    const adminUsername = 'admin';
    const adminEmail = 'admin@minimalhuman.com';
    const adminPassword = 'adminpassword123'; // Change this as needed

    // Check if admin already exists
    const existingAdmin = await User.findOne({ username: adminUsername });
    if (existingAdmin) {
      console.log(`Admin user '${adminUsername}' already exists.`);
      process.exit(0);
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminPassword, salt);

    // Create the admin
    const newAdmin = new User({
      username: adminUsername,
      email: adminEmail,
      password: hashedPassword,
      role: 'admin',
      isActive: true
    });

    await newAdmin.save();
    console.log('\n==================================================');
    console.log('Admin user successfully seeded!');
    console.log(`Username: ${adminUsername}`);
    console.log(`Email: ${adminEmail}`);
    console.log(`Password: ${adminPassword}`);
    console.log('==================================================\n');
  } catch (error) {
    console.error('Error seeding admin user:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
  }
}

seedAdmin();
