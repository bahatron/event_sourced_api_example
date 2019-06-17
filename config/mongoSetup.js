db = db.getSiblingDB("admin");
db.createUser({ user: "user", pwd: "admin", roles: ["readWriteAnyDatabase"] });
