
import User from "../models/user.js";

const demoAccounts = [
  { username: "admin", password: "admin123", role: "admin", profile: 'admin' },
  { username: "parent1", password: "parent1", role: "parent", profile: 'parent'},
  { username: "teacher1", password: "teacher1", role: "teacher", profile: 'teacher' },
];

async function seedDemoAccounts() {
  for (const account of demoAccounts) {
    const existingUser = await User.findOne({
      username: account.username,
    });

    if (existingUser) {
      console.log(`Demo account already exists: ${account.username}`);
      continue;
    }

    await User.create(demoAccounts);

    console.log(`Created demo account: ${account.username}`);
  }
}

export{seedDemoAccounts}
