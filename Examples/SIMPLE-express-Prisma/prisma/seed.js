const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const authData = [
  {
    name: 'Alice',
    email: 'alice@prisma.io',
    posts: {
      create: [
        {
          title: 'Join the Prisma Slack',
          content: 'https://slack.prisma.io',
          published: true,
        },
      ],
    },
  },
  {
    name: 'Nilu',
    email: 'nilu@prisma.io',
    posts: {
      create: [
        {
          title: 'Follow Prisma on Twitter',
          content: 'https://www.twitter.com/prisma',
          published: true,
          viewCount: 42,
        },
      ],
    },
  },
  {
    name: 'Mahmoud',
    email: 'mahmoud@prisma.io',
    posts: {
      create: [
        {
          title: 'Ask a question about Prisma on GitHub',
          content: 'https://www.github.com/prisma/prisma/discussions',
          published: true,
          viewCount: 128,
        },
        {
          title: 'Prisma on YouTube',
          content: 'https://pris.ly/youtube',
        },
      ],
    },
  },
]

async function main() {
  console.log(`Start seeding ...`)
  // for (const u of authData) {
  //   const auth = await prisma.auth.create({
  //     data: u,
  //   })
  //   console.log(`Created user with id: ${auth.id}`)
  // }

  await prisma.employee.createMany({
    data: [
      {
        firstName: 'John',
        lastName: 'Doe',
        birthday: new Date('1990-01-15'),
        email: 'john.doe@example.com',
        numberPhone: '123456789',
        address: '123 Main St, City',
        password: 'password123',
      },
      // Add more employee data here
    ],
    skipDuplicates: false, // To skip inserting duplicate data
  });

  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })