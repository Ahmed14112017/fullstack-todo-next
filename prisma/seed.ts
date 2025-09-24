import { PrismaClient } from "../node_modules/prisma/prisma-client/default";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  // await prisma.user.createMany({
  //   data: Array.from({ length: 25 }, () => {
  //     return {
  //       email: faker.internet.email(),
  //       name: faker.internet.username(),
  //       address: {
  //         city: faker.location.city(),
  //         street: faker.location.street(),
  //         state: faker.location.state(),
  //         zip: faker.location.zipCode(),
  //       },
  //     };
  //   }),
  // });
  await prisma.todo.createMany({
    data: Array.from({ length: 25 }, () => {
      return {
        title: faker.lorem.words({ min: 5, max: 10 }),
        body: faker.lorem.words({ min: 10, max: 80 }),
      };
    }),
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
