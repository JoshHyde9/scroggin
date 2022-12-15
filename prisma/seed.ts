import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany({});
  await prisma.like.deleteMany({});
  await prisma.recipe.deleteMany({});

  await prisma.user.createMany({
    data: [
      {
        id: "aaa3df88-8d04-4397-a3df-2d2d7e04823d",
        firstName: "Brooks",
        lastName: "Kalvin",
        email: "bkalvin0@nasa.gov",
        password:
          "$argon2id$v=19$m=663641,t=41456,p=45,keyid=c$njagjTvAEffVUqSDXG7VmXw0Z8BRjMob98CrBqbbUQ3VG9Gookczx$Xnw4dPrbGO2/SHvcqr9sNakiiQev6Eh0sntnLzRYl7lirbTiH6Z+e",
      },
      {
        id: "0803ecbf-d3e0-4c7f-8e24-cbc784772320",
        firstName: "Kristal",
        lastName: "Guilayn",
        email: "kguilayn1@g.co",
        password:
          "$argon2id$v=19$m=663641,t=41456,p=45,keyid=c$njagjTvAEffVUqSDXG7VmXw0Z8BRjMob98CrBqbbUQ3VG9Gookczx$Xnw4dPrbGO2/SHvcqr9sNakiiQev6Eh0sntnLzRYl7lirbTiH6Z+e",
      },
      {
        id: "f5884097-7299-4050-b331-1d8b766a65d8",
        firstName: "Godart",
        lastName: "Carlone",
        email: "gcarlone2@sbwire.com",
        password:
          "$argon2id$v=19$m=663641,t=41456,p=45,keyid=c$njagjTvAEffVUqSDXG7VmXw0Z8BRjMob98CrBqbbUQ3VG9Gookczx$Xnw4dPrbGO2/SHvcqr9sNakiiQev6Eh0sntnLzRYl7lirbTiH6Z+e",
      },
      {
        id: "f2ed20bf-b1f3-4395-8cf6-26ddfada1c3e",
        firstName: "Adriano",
        lastName: "Gergolet",
        email: "agergolet3@elpais.com",
        password:
          "$argon2id$v=19$m=663641,t=41456,p=45,keyid=c$njagjTvAEffVUqSDXG7VmXw0Z8BRjMob98CrBqbbUQ3VG9Gookczx$Xnw4dPrbGO2/SHvcqr9sNakiiQev6Eh0sntnLzRYl7lirbTiH6Z+e",
      },
      {
        id: "418fd7f3-444e-4c3f-97e4-ad40eb1262bd",
        firstName: "Curcio",
        lastName: "Salt",
        email: "csalt4@ucoz.com",
        password:
          "$argon2id$v=19$m=663641,t=41456,p=45,keyid=c$njagjTvAEffVUqSDXG7VmXw0Z8BRjMob98CrBqbbUQ3VG9Gookczx$Xnw4dPrbGO2/SHvcqr9sNakiiQev6Eh0sntnLzRYl7lirbTiH6Z+e",
      },
      {
        id: "b556ec30-c22b-40ed-aac5-9a350d88312e",
        firstName: "Clarie",
        lastName: "Dearle-Palser",
        email: "cdearlepalser5@nhs.uk",
        password:
          "$argon2id$v=19$m=663641,t=41456,p=45,keyid=c$njagjTvAEffVUqSDXG7VmXw0Z8BRjMob98CrBqbbUQ3VG9Gookczx$Xnw4dPrbGO2/SHvcqr9sNakiiQev6Eh0sntnLzRYl7lirbTiH6Z+e",
      },
      {
        id: "8a14b091-3422-4944-bac8-5e7def785c95",
        firstName: "Hillier",
        lastName: "Mottley",
        email: "hmottley6@sun.com",
        password:
          "$argon2id$v=19$m=663641,t=41456,p=45,keyid=c$njagjTvAEffVUqSDXG7VmXw0Z8BRjMob98CrBqbbUQ3VG9Gookczx$Xnw4dPrbGO2/SHvcqr9sNakiiQev6Eh0sntnLzRYl7lirbTiH6Z+e",
      },
      {
        id: "583b20be-f78a-4bb5-9432-928b2996f41d",
        firstName: "Koressa",
        lastName: "Archell",
        email: "karchell7@businessweek.com",
        password:
          "$argon2id$v=19$m=663641,t=41456,p=45,keyid=c$njagjTvAEffVUqSDXG7VmXw0Z8BRjMob98CrBqbbUQ3VG9Gookczx$Xnw4dPrbGO2/SHvcqr9sNakiiQev6Eh0sntnLzRYl7lirbTiH6Z+e",
      },
      {
        id: "0732fbfe-c740-4621-8814-0876fca369ee",
        firstName: "Sharona",
        lastName: "Sharple",
        email: "ssharple8@wikia.com",
        password:
          "$argon2id$v=19$m=663641,t=41456,p=45,keyid=c$njagjTvAEffVUqSDXG7VmXw0Z8BRjMob98CrBqbbUQ3VG9Gookczx$Xnw4dPrbGO2/SHvcqr9sNakiiQev6Eh0sntnLzRYl7lirbTiH6Z+e",
      },
      {
        id: "1169a41f-3eb2-42d4-9f9b-d7cd7a37fc77",
        firstName: "Bernie",
        lastName: "Lupson",
        email: "blupson9@nhs.uk",
        password:
          "$argon2id$v=19$m=663641,t=41456,p=45,keyid=c$njagjTvAEffVUqSDXG7VmXw0Z8BRjMob98CrBqbbUQ3VG9Gookczx$Xnw4dPrbGO2/SHvcqr9sNakiiQev6Eh0sntnLzRYl7lirbTiH6Z+e",
      },
      {
        id: "e2402551-1647-4848-99db-50d16004a208",
        firstName: "Nerta",
        lastName: "Ashmole",
        email: "nashmolea@google.de",
        password:
          "$argon2id$v=19$m=663641,t=41456,p=45,keyid=c$njagjTvAEffVUqSDXG7VmXw0Z8BRjMob98CrBqbbUQ3VG9Gookczx$Xnw4dPrbGO2/SHvcqr9sNakiiQev6Eh0sntnLzRYl7lirbTiH6Z+e",
      },
      {
        id: "a91ac4bf-1106-45fb-bb88-173e01571fdb",
        firstName: "Sebastien",
        lastName: "Leivers",
        email: "sleiversb@unblog.fr",
        password:
          "$argon2id$v=19$m=663641,t=41456,p=45,keyid=c$njagjTvAEffVUqSDXG7VmXw0Z8BRjMob98CrBqbbUQ3VG9Gookczx$Xnw4dPrbGO2/SHvcqr9sNakiiQev6Eh0sntnLzRYl7lirbTiH6Z+e",
      },
      {
        id: "f0c33eaa-478f-4201-84be-4ff5b1e60505",
        firstName: "Eldredge",
        lastName: "Skone",
        email: "eskonec@icio.us",
        password:
          "$argon2id$v=19$m=663641,t=41456,p=45,keyid=c$njagjTvAEffVUqSDXG7VmXw0Z8BRjMob98CrBqbbUQ3VG9Gookczx$Xnw4dPrbGO2/SHvcqr9sNakiiQev6Eh0sntnLzRYl7lirbTiH6Z+e",
      },
      {
        id: "3d5f939f-870e-424c-b6b7-7e60e7a3d34a",
        firstName: "Winna",
        lastName: "Meegin",
        email: "wmeegind@google.fr",
        password:
          "$argon2id$v=19$m=663641,t=41456,p=45,keyid=c$njagjTvAEffVUqSDXG7VmXw0Z8BRjMob98CrBqbbUQ3VG9Gookczx$Xnw4dPrbGO2/SHvcqr9sNakiiQev6Eh0sntnLzRYl7lirbTiH6Z+e",
      },
      {
        id: "c78e5320-2f95-4994-ae7e-8560ff3a3c32",
        firstName: "Marcie",
        lastName: "Musslewhite",
        email: "mmusslewhitee@php.net",
        password:
          "$argon2id$v=19$m=663641,t=41456,p=45,keyid=c$njagjTvAEffVUqSDXG7VmXw0Z8BRjMob98CrBqbbUQ3VG9Gookczx$Xnw4dPrbGO2/SHvcqr9sNakiiQev6Eh0sntnLzRYl7lirbTiH6Z+e",
      },
      {
        id: "633a21eb-30f7-4b7e-9cd3-135d69545e20",
        firstName: "D'arcy",
        lastName: "Habershon",
        email: "dhabershonf@icio.us",
        password:
          "$argon2id$v=19$m=663641,t=41456,p=45,keyid=c$njagjTvAEffVUqSDXG7VmXw0Z8BRjMob98CrBqbbUQ3VG9Gookczx$Xnw4dPrbGO2/SHvcqr9sNakiiQev6Eh0sntnLzRYl7lirbTiH6Z+e",
      },
      {
        id: "213b31b8-749c-4f2b-ad43-e737555eb83c",
        firstName: "Joby",
        lastName: "Pendrick",
        email: "jpendrickg@google.fr",
        password:
          "$argon2id$v=19$m=663641,t=41456,p=45,keyid=c$njagjTvAEffVUqSDXG7VmXw0Z8BRjMob98CrBqbbUQ3VG9Gookczx$Xnw4dPrbGO2/SHvcqr9sNakiiQev6Eh0sntnLzRYl7lirbTiH6Z+e",
      },
      {
        id: "f5af37a1-8d4f-4aae-8869-6055fd35cc15",
        firstName: "Adora",
        lastName: "Buckland",
        email: "abucklandh@xing.com",
        password:
          "$argon2id$v=19$m=663641,t=41456,p=45,keyid=c$njagjTvAEffVUqSDXG7VmXw0Z8BRjMob98CrBqbbUQ3VG9Gookczx$Xnw4dPrbGO2/SHvcqr9sNakiiQev6Eh0sntnLzRYl7lirbTiH6Z+e",
      },
      {
        id: "5cbb74b4-f0cf-4aea-b160-a1abe125f338",
        firstName: "Huntington",
        lastName: "D'Emanuele",
        email: "hdemanuelei@jiathis.com",
        password:
          "$argon2id$v=19$m=663641,t=41456,p=45,keyid=c$njagjTvAEffVUqSDXG7VmXw0Z8BRjMob98CrBqbbUQ3VG9Gookczx$Xnw4dPrbGO2/SHvcqr9sNakiiQev6Eh0sntnLzRYl7lirbTiH6Z+e",
      },
      {
        id: "2a52ac24-07d9-4c70-8d17-5c3d89bff992",
        firstName: "Gearalt",
        lastName: "Measor",
        email: "gmeasorj@foxnews.com",
        password:
          "$argon2id$v=19$m=663641,t=41456,p=45,keyid=c$njagjTvAEffVUqSDXG7VmXw0Z8BRjMob98CrBqbbUQ3VG9Gookczx$Xnw4dPrbGO2/SHvcqr9sNakiiQev6Eh0sntnLzRYl7lirbTiH6Z+e",
      },
      {
        id: "469ef2e1-4710-442d-867e-4168c306e186",
        firstName: "Graig",
        lastName: "Seamer",
        email: "gseamerk@wsj.com",
        password:
          "$argon2id$v=19$m=663641,t=41456,p=45,keyid=c$njagjTvAEffVUqSDXG7VmXw0Z8BRjMob98CrBqbbUQ3VG9Gookczx$Xnw4dPrbGO2/SHvcqr9sNakiiQev6Eh0sntnLzRYl7lirbTiH6Z+e",
      },
      {
        id: "9489616f-715d-4af3-bf9b-7f7bde52b3e7",
        firstName: "Lazar",
        lastName: "Carrol",
        email: "lcarroll@shareasale.com",
        password:
          "$argon2id$v=19$m=663641,t=41456,p=45,keyid=c$njagjTvAEffVUqSDXG7VmXw0Z8BRjMob98CrBqbbUQ3VG9Gookczx$Xnw4dPrbGO2/SHvcqr9sNakiiQev6Eh0sntnLzRYl7lirbTiH6Z+e",
      },
      {
        id: "e7e8db88-f13d-439f-bb8c-595011e54a77",
        firstName: "Selena",
        lastName: "Allenby",
        email: "sallenbym@de.vu",
        password:
          "$argon2id$v=19$m=663641,t=41456,p=45,keyid=c$njagjTvAEffVUqSDXG7VmXw0Z8BRjMob98CrBqbbUQ3VG9Gookczx$Xnw4dPrbGO2/SHvcqr9sNakiiQev6Eh0sntnLzRYl7lirbTiH6Z+e",
      },
      {
        id: "b01d65e5-bcd2-48aa-a53e-3937afe6f5ea",
        firstName: "Ginger",
        lastName: "Baise",
        email: "gbaisen@quantcast.com",
        password:
          "$argon2id$v=19$m=663641,t=41456,p=45,keyid=c$njagjTvAEffVUqSDXG7VmXw0Z8BRjMob98CrBqbbUQ3VG9Gookczx$Xnw4dPrbGO2/SHvcqr9sNakiiQev6Eh0sntnLzRYl7lirbTiH6Z+e",
      },
      {
        id: "9b027577-929b-486a-b334-279ac75176a9",
        firstName: "Dannie",
        lastName: "Brenton",
        email: "dbrentono@amazon.de",
        password:
          "$argon2id$v=19$m=663641,t=41456,p=45,keyid=c$njagjTvAEffVUqSDXG7VmXw0Z8BRjMob98CrBqbbUQ3VG9Gookczx$Xnw4dPrbGO2/SHvcqr9sNakiiQev6Eh0sntnLzRYl7lirbTiH6Z+e",
      },
      {
        id: "343fa9bd-e0e8-47a1-88e4-aa397ebb164b",
        firstName: "Penn",
        lastName: "Stallebrass",
        email: "pstallebrassp@mysql.com",
        password:
          "$argon2id$v=19$m=663641,t=41456,p=45,keyid=c$njagjTvAEffVUqSDXG7VmXw0Z8BRjMob98CrBqbbUQ3VG9Gookczx$Xnw4dPrbGO2/SHvcqr9sNakiiQev6Eh0sntnLzRYl7lirbTiH6Z+e",
      },
      {
        id: "78c1ead7-72d5-4742-9b6e-9a081cbe2e65",
        firstName: "Price",
        lastName: "Stuehmeier",
        email: "pstuehmeierq@constantcontact.com",
        password:
          "$argon2id$v=19$m=663641,t=41456,p=45,keyid=c$njagjTvAEffVUqSDXG7VmXw0Z8BRjMob98CrBqbbUQ3VG9Gookczx$Xnw4dPrbGO2/SHvcqr9sNakiiQev6Eh0sntnLzRYl7lirbTiH6Z+e",
      },
      {
        id: "c8bc3670-202b-4b50-bdb7-da37bc68f74d",
        firstName: "Brnaba",
        lastName: "Peek",
        email: "bpeekr@cpanel.net",
        password:
          "$argon2id$v=19$m=663641,t=41456,p=45,keyid=c$njagjTvAEffVUqSDXG7VmXw0Z8BRjMob98CrBqbbUQ3VG9Gookczx$Xnw4dPrbGO2/SHvcqr9sNakiiQev6Eh0sntnLzRYl7lirbTiH6Z+e",
      },
      {
        id: "f6e84609-32a5-4e64-842b-7bbd96f7dd43",
        firstName: "Mahalia",
        lastName: "Wincer",
        email: "mwincers@google.com",
        password:
          "$argon2id$v=19$m=663641,t=41456,p=45,keyid=c$njagjTvAEffVUqSDXG7VmXw0Z8BRjMob98CrBqbbUQ3VG9Gookczx$Xnw4dPrbGO2/SHvcqr9sNakiiQev6Eh0sntnLzRYl7lirbTiH6Z+e",
      },
      {
        id: "c38124a2-ccef-4e6b-a6dd-8d5df97a58cb",
        firstName: "Zebedee",
        lastName: "Maitland",
        email: "zmaitlandt@flickr.com",
        password:
          "$argon2id$v=19$m=663641,t=41456,p=45,keyid=c$njagjTvAEffVUqSDXG7VmXw0Z8BRjMob98CrBqbbUQ3VG9Gookczx$Xnw4dPrbGO2/SHvcqr9sNakiiQev6Eh0sntnLzRYl7lirbTiH6Z+e",
      },
    ],
  });

  await prisma.recipe.createMany({
    data: [
      {
        id: "17763540-2df8-4d35-a82b-ee008da1efb4",
        name: "Red",
        ingredients:
          "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl. Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum. Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.",
        method:
          "Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus. Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst. Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat. Curabitur gravida nisi at nibh. In hac habitasse platea dictumst.",
        displayImage: "http://dummyimage.com/115x100.png/dddddd/000000",
        tags: ["baking", "dessert", "epicness"],
        createdAt: new Date("2022-09-22 05:56:34"),
        updatedAt: new Date("2022-08-26 11:43:00"),
        userId: "3d5f939f-870e-424c-b6b7-7e60e7a3d34a",
      },
      {
        id: "66d94073-fccf-41a8-a708-39edd69eedfa",
        name: "Red",
        ingredients:
          "Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.",
        method:
          "Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum. In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo. Aliquam quis turpis eget elit sodales scelerisque.",
        displayImage: "http://dummyimage.com/187x100.png/5fa2dd/ffffff",
        tags: ["baking", "dessert", "epicness"],
        createdAt: new Date("2022-01-04 15:36:28"),
        updatedAt: new Date("2022-09-26 12:22:36"),
        userId: "2a52ac24-07d9-4c70-8d17-5c3d89bff992",
      },
      {
        id: "d408196b-e051-4c1b-9c56-31f948bb1627",
        name: "Crimson",
        ingredients: "Pellentesque viverra pede ac diam.",
        method:
          "Maecenas pulvinar lobortis est. Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum. Proin eu mi. Nulla ac enim.",
        displayImage: "http://dummyimage.com/158x100.png/ff4444/ffffff",
        tags: ["baking", "dessert", "epicness"],
        createdAt: new Date("2022-03-11 23:38:02"),
        updatedAt: new Date("2022-12-06 01:12:32"),
        userId: "8a14b091-3422-4944-bac8-5e7def785c95",
      },
      {
        id: "12c8c986-de3a-4672-a523-4ed281d2508d",
        name: "Yellow",
        ingredients:
          "Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis. Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem. Sed sagittis.",
        method:
          "Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem. Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.",
        displayImage: "http://dummyimage.com/105x100.png/ff4444/ffffff",
        tags: ["baking", "dessert", "epicness"],
        createdAt: new Date("2022-08-17 18:16:36"),
        updatedAt: new Date("2022-04-04 07:08:50"),
        userId: "f5884097-7299-4050-b331-1d8b766a65d8",
      },
      {
        id: "d37ab2f7-f274-4cc8-b5f5-6438b0ccbd81",
        name: "Puce",
        ingredients: "In sagittis dui vel nisl. Duis ac nibh.",
        method:
          "Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum. Curabitur in libero ut massa volutpat convallis.",
        displayImage: "http://dummyimage.com/189x100.png/5fa2dd/ffffff",
        tags: ["baking", "dessert", "epicness"],
        createdAt: new Date("2021-12-18 01:22:03"),
        updatedAt: new Date("2022-08-08 20:49:27"),
        userId: "f2ed20bf-b1f3-4395-8cf6-26ddfada1c3e",
      },
      {
        id: "4166ada5-a062-4b9e-b1e3-2b0112086175",
        name: "Blue",
        ingredients:
          "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis. Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.",
        method:
          "Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est. Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.",
        displayImage: "http://dummyimage.com/157x100.png/dddddd/000000",
        tags: ["baking", "dessert", "epicness"],
        createdAt: new Date("2022-03-10 04:27:39"),
        updatedAt: new Date("2022-04-11 17:43:32"),
        userId: "e7e8db88-f13d-439f-bb8c-595011e54a77",
      },
      {
        id: "33dd9227-6cd4-4316-b46c-39615553fcbe",
        name: "Aquamarine",
        ingredients:
          "Phasellus in felis. Donec semper sapien a libero. Nam dui. Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis.",
        method:
          "Nulla mollis molestie lorem. Quisque ut erat. Curabitur gravida nisi at nibh. In hac habitasse platea dictumst.",
        displayImage: "http://dummyimage.com/217x100.png/5fa2dd/ffffff",
        tags: ["baking", "dessert", "epicness"],
        createdAt: new Date("2021-12-29 02:35:05"),
        updatedAt: new Date("2022-08-29 22:35:16"),
        userId: "418fd7f3-444e-4c3f-97e4-ad40eb1262bd",
      },
      {
        id: "a8feca69-c61d-4006-93af-ee318847f23e",
        name: "Teal",
        ingredients:
          "Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem. Fusce consequat. Nulla nisl. Nunc nisl. Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa.",
        method:
          "Aenean sit amet justo. Morbi ut odio. Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue.",
        displayImage: "http://dummyimage.com/215x100.png/dddddd/000000",
        tags: ["baking", "dessert", "epicness"],
        createdAt: new Date("2022-09-12 05:08:19"),
        updatedAt: new Date("2021-12-24 11:39:53"),
        userId: "a91ac4bf-1106-45fb-bb88-173e01571fdb",
      },
      {
        id: "04976cc3-ac2c-4441-9a93-19b52c1a8f6c",
        name: "Goldenrod",
        ingredients:
          "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.",
        method:
          "Nam dui. Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis.",
        displayImage: "http://dummyimage.com/152x100.png/5fa2dd/ffffff",
        tags: ["baking", "dessert", "epicness"],
        createdAt: new Date("2022-11-06 19:09:51"),
        updatedAt: new Date("2022-05-13 18:02:09"),
        userId: "418fd7f3-444e-4c3f-97e4-ad40eb1262bd",
      },
      {
        id: "9106d519-bc13-4eac-b221-ce6cb46b8170",
        name: "Yellow",
        ingredients:
          "Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.",
        method:
          "Nunc rhoncus dui vel sem. Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.",
        displayImage: "http://dummyimage.com/181x100.png/5fa2dd/ffffff",
        tags: ["baking", "dessert", "epicness"],
        createdAt: new Date("2021-12-21 02:22:50"),
        updatedAt: new Date("2022-05-23 03:46:51"),
        userId: "0803ecbf-d3e0-4c7f-8e24-cbc784772320",
      },
      {
        id: "352fc0c7-bb27-476c-9d89-854821a7cb64",
        name: "Green",
        ingredients:
          "Nulla justo. Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis. Sed ante. Vivamus tortor. Duis mattis egestas metus.",
        method:
          "Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros. Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat. In congue. Etiam justo. Etiam pretium iaculis justo. In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.",
        displayImage: "http://dummyimage.com/148x100.png/5fa2dd/ffffff",
        tags: ["baking", "dessert", "epicness"],
        createdAt: new Date("2022-03-02 05:17:48"),
        updatedAt: new Date("2022-08-04 16:42:13"),
        userId: "b556ec30-c22b-40ed-aac5-9a350d88312e",
      },
      {
        id: "da310f2c-cfb7-4896-a0e3-46fc6b88da39",
        name: "Turquoise",
        ingredients:
          "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem. Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio. Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo.",
        method: "Aenean fermentum.",
        displayImage: "http://dummyimage.com/117x100.png/cc0000/ffffff",
        tags: ["baking", "dessert", "epicness"],
        createdAt: new Date("2022-08-05 18:20:42"),
        updatedAt: new Date("2022-02-12 02:28:27"),
        userId: "f2ed20bf-b1f3-4395-8cf6-26ddfada1c3e",
      },
      {
        id: "ff281627-ebac-46d2-affa-71ca9019a623",
        name: "Indigo",
        ingredients:
          "Nulla justo. Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis. Sed ante.",
        method:
          "Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat.",
        displayImage: "http://dummyimage.com/220x100.png/cc0000/ffffff",
        tags: ["baking", "dessert", "epicness"],
        createdAt: new Date("2022-05-09 14:38:31"),
        updatedAt: new Date("2022-05-25 22:51:44"),
        userId: "583b20be-f78a-4bb5-9432-928b2996f41d",
      },
      {
        id: "d063d964-3655-4087-9ed3-24c0c2b26bcd",
        name: "Goldenrod",
        ingredients:
          "Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius. Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.",
        method:
          "Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui. Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti. Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.",
        displayImage: "http://dummyimage.com/202x100.png/ff4444/ffffff",
        tags: ["baking", "dessert", "epicness"],
        createdAt: new Date("2022-02-12 17:37:49"),
        updatedAt: new Date("2022-09-07 06:58:21"),
        userId: "343fa9bd-e0e8-47a1-88e4-aa397ebb164b",
      },
      {
        id: "37bdbe3d-4710-4e07-83e9-0a1c96d1e547",
        name: "Pink",
        ingredients: "Duis at velit eu est congue elementum.",
        method:
          "Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum. Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est. Phasellus sit amet erat. Nulla tempus.",
        displayImage: "http://dummyimage.com/104x100.png/ff4444/ffffff",
        tags: ["baking", "dessert", "epicness"],
        createdAt: new Date("2022-06-25 19:30:03"),
        updatedAt: new Date("2022-04-09 04:20:03"),
        userId: "c38124a2-ccef-4e6b-a6dd-8d5df97a58cb",
      },
      {
        id: "e07359d8-14dd-4a5f-8dbc-c18ea88c488c",
        name: "Purple",
        ingredients:
          "Vivamus in felis eu sapien cursus vestibulum. Proin eu mi.",
        method:
          "Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl. Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum. Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.",
        displayImage: "http://dummyimage.com/199x100.png/cc0000/ffffff",
        tags: ["baking", "dessert", "epicness"],
        createdAt: new Date("2022-11-05 23:12:01"),
        updatedAt: new Date("2022-02-12 11:20:05"),
        userId: "9b027577-929b-486a-b334-279ac75176a9",
      },
      {
        id: "d4f3f916-c202-4cb2-bfed-0339f241ca27",
        name: "Khaki",
        ingredients:
          "Nullam sit amet turpis elementum ligula vehicula consequat.",
        method:
          "Quisque ut erat. Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem. Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.",
        displayImage: "http://dummyimage.com/225x100.png/5fa2dd/ffffff",
        tags: ["baking", "dessert", "epicness"],
        createdAt: new Date("2022-05-03 13:19:19"),
        updatedAt: new Date("2022-04-25 07:26:39"),
        userId: "f5884097-7299-4050-b331-1d8b766a65d8",
      },
      {
        id: "7da2a7e2-37c9-4111-9b54-3e220e618652",
        name: "Teal",
        ingredients:
          "Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum. Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem. Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.",
        method:
          "Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem. Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus. Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.",
        displayImage: "http://dummyimage.com/250x100.png/dddddd/000000",
        tags: ["baking", "dessert", "epicness"],
        createdAt: new Date("2022-04-02 11:55:00"),
        updatedAt: new Date("2022-04-03 05:25:38"),
        userId: "9b027577-929b-486a-b334-279ac75176a9",
      },
      {
        id: "8ea23174-1705-4328-9ff8-681dbfc913a4",
        name: "Puce",
        ingredients:
          "Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem. Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit. Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi.",
        method:
          "Vivamus in felis eu sapien cursus vestibulum. Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem. Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.",
        displayImage: "http://dummyimage.com/220x100.png/5fa2dd/ffffff",
        tags: ["baking", "dessert", "epicness"],
        createdAt: new Date("2022-04-04 07:23:10"),
        updatedAt: new Date("2022-10-17 17:44:31"),
        userId: "a91ac4bf-1106-45fb-bb88-173e01571fdb",
      },
      {
        id: "ba0f7c60-e415-4e0f-96ed-54aa2bcc03d5",
        name: "Yellow",
        ingredients:
          "Nunc purus. Phasellus in felis. Donec semper sapien a libero.",
        method:
          "Suspendisse potenti. Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris. Morbi non lectus.",
        displayImage: "http://dummyimage.com/131x100.png/ff4444/ffffff",
        tags: ["baking", "dessert", "epicness"],
        createdAt: new Date("2022-01-16 23:02:43"),
        updatedAt: new Date("2022-07-08 22:45:54"),
        userId: "f5884097-7299-4050-b331-1d8b766a65d8",
      },
      {
        id: "9049edd8-dd29-40d6-a2e7-7e715245ab73",
        name: "Goldenrod",
        ingredients:
          "Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus. Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
        method:
          "Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem. Sed sagittis.",
        displayImage: "http://dummyimage.com/177x100.png/dddddd/000000",
        tags: ["baking", "dessert", "epicness"],
        createdAt: new Date("2022-04-13 20:19:21"),
        updatedAt: new Date("2022-06-10 09:20:44"),
        userId: "b556ec30-c22b-40ed-aac5-9a350d88312e",
      },
      {
        id: "f38134fe-f7a1-4393-b357-d84123319416",
        name: "Green",
        ingredients:
          "Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus. In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus. Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.",
        method:
          "Donec posuere metus vitae ipsum. Aliquam non mauris. Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis. Fusce posuere felis sed lacus.",
        displayImage: "http://dummyimage.com/241x100.png/ff4444/ffffff",
        tags: ["baking", "dessert", "epicness"],
        createdAt: new Date("2022-04-04 19:21:46"),
        updatedAt: new Date("2022-03-09 18:17:53"),
        userId: "c78e5320-2f95-4994-ae7e-8560ff3a3c32",
      },
      {
        id: "645df710-98e0-4b5d-81ad-012ee97a62a1",
        name: "Green",
        ingredients:
          "Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet. Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui. Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti. Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum.",
        method:
          "Suspendisse potenti. Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum.",
        displayImage: "http://dummyimage.com/109x100.png/ff4444/ffffff",
        tags: ["baking", "dessert", "epicness"],
        createdAt: new Date("2022-02-19 13:32:48"),
        updatedAt: new Date("2022-09-02 16:21:46"),
        userId: "8a14b091-3422-4944-bac8-5e7def785c95",
      },
      {
        id: "2fb0a934-9c02-4592-90b8-6540866875ca",
        name: "Khaki",
        ingredients: "Morbi a ipsum. Integer a nibh. In quis justo.",
        method:
          "Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis. Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem. Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci.",
        displayImage: "http://dummyimage.com/119x100.png/dddddd/000000",
        tags: ["baking", "dessert", "epicness"],
        createdAt: new Date("2022-08-19 09:33:32"),
        updatedAt: new Date("2022-07-06 11:17:19"),
        userId: "1169a41f-3eb2-42d4-9f9b-d7cd7a37fc77",
      },
      {
        id: "4b8a584d-5767-4d85-b649-4169df43506e",
        name: "Violet",
        ingredients:
          "Nulla facilisi. Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit.",
        method:
          "Morbi a ipsum. Integer a nibh. In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet. Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui. Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc.",
        displayImage: "http://dummyimage.com/232x100.png/5fa2dd/ffffff",
        tags: ["baking", "dessert", "epicness"],
        createdAt: new Date("2022-05-08 19:55:57"),
        updatedAt: new Date("2022-05-12 03:20:21"),
        userId: "f5884097-7299-4050-b331-1d8b766a65d8",
      },
      {
        id: "4f6505fe-c8de-495a-aac8-1727719b46e1",
        name: "Purple",
        ingredients:
          "Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.",
        method:
          "Donec semper sapien a libero. Nam dui. Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis.",
        displayImage: "http://dummyimage.com/137x100.png/5fa2dd/ffffff",
        tags: ["baking", "dessert", "epicness"],
        createdAt: new Date("2022-07-11 20:33:05"),
        updatedAt: new Date("2022-05-08 17:05:09"),
        userId: "1169a41f-3eb2-42d4-9f9b-d7cd7a37fc77",
      },
      {
        id: "121b090e-687d-4877-82d7-694882e9c90d",
        name: "Violet",
        ingredients:
          "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.",
        method:
          "Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl. Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.",
        displayImage: "http://dummyimage.com/207x100.png/5fa2dd/ffffff",
        tags: ["baking", "dessert", "epicness"],
        createdAt: new Date("2022-09-30 13:16:30"),
        updatedAt: new Date("2022-05-11 04:30:59"),
        userId: "2a52ac24-07d9-4c70-8d17-5c3d89bff992",
      },
      {
        id: "2acdf646-5fe0-486c-8368-57d655bf9cf8",
        name: "Pink",
        ingredients:
          "Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus. Pellentesque at nulla. Suspendisse potenti.",
        method:
          "Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst. Maecenas ut massa quis augue luctus tincidunt.",
        displayImage: "http://dummyimage.com/201x100.png/ff4444/ffffff",
        tags: ["baking", "dessert", "epicness"],
        createdAt: new Date("2022-05-19 17:17:40"),
        updatedAt: new Date("2021-12-18 20:28:30"),
        userId: "9489616f-715d-4af3-bf9b-7f7bde52b3e7",
      },
      {
        id: "256d10ce-cd8e-4f72-8657-12cef3daa7ba",
        name: "Aquamarine",
        ingredients:
          "Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero. Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh. In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.",
        method:
          "Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem. Sed sagittis.",
        displayImage: "http://dummyimage.com/155x100.png/dddddd/000000",
        tags: ["baking", "dessert", "epicness"],
        createdAt: new Date("2022-12-03 05:20:43"),
        updatedAt: new Date("2022-03-17 10:31:18"),
        userId: "633a21eb-30f7-4b7e-9cd3-135d69545e20",
      },
      {
        id: "97bf2307-7d42-4c89-b08d-7154dada6e46",
        name: "Yellow",
        ingredients:
          "Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem. Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio. Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo.",
        method: "Nullam varius.",
        displayImage: "http://dummyimage.com/100x100.png/cc0000/ffffff",
        tags: ["baking", "dessert", "epicness"],
        createdAt: new Date("2022-07-23 10:41:18"),
        updatedAt: new Date("2022-07-06 01:42:33"),
        userId: "c8bc3670-202b-4b50-bdb7-da37bc68f74d",
      },
    ],
  });

  await prisma.like.createMany({
    data: [
      {
        id: "1d037d73-a436-4b20-aef7-63f63ca11e06",
        recipeId: "17763540-2df8-4d35-a82b-ee008da1efb4",
        userId: "aaa3df88-8d04-4397-a3df-2d2d7e04823d",
      },
      {
        id: "9efd6de9-c679-41fc-8657-cf36fc01db5d",
        recipeId: "66d94073-fccf-41a8-a708-39edd69eedfa",
        userId: "0803ecbf-d3e0-4c7f-8e24-cbc784772320",
      },
      {
        id: "876b922d-ebd0-4b29-885f-4afedba08e6e",
        recipeId: "d408196b-e051-4c1b-9c56-31f948bb1627",
        userId: "f5884097-7299-4050-b331-1d8b766a65d8",
      },
      {
        id: "6951dd04-fa59-48a3-b9a0-2a454d2c028b",
        recipeId: "12c8c986-de3a-4672-a523-4ed281d2508d",
        userId: "f2ed20bf-b1f3-4395-8cf6-26ddfada1c3e",
      },
      {
        id: "cae5e7c9-1ae1-4c9b-9b50-5839c0f345fe",
        recipeId: "d37ab2f7-f274-4cc8-b5f5-6438b0ccbd81",
        userId: "418fd7f3-444e-4c3f-97e4-ad40eb1262bd",
      },
      {
        id: "48353c0b-40ca-4985-ad85-21b1725e2b0b",
        recipeId: "4166ada5-a062-4b9e-b1e3-2b0112086175",
        userId: "b556ec30-c22b-40ed-aac5-9a350d88312e",
      },
      {
        id: "8545b780-8e90-4ab4-823e-d0da3c50b580",
        recipeId: "33dd9227-6cd4-4316-b46c-39615553fcbe",
        userId: "8a14b091-3422-4944-bac8-5e7def785c95",
      },
      {
        id: "827d9754-8ef9-4fb2-bc5d-1e26dab63a2b",
        recipeId: "a8feca69-c61d-4006-93af-ee318847f23e",
        userId: "583b20be-f78a-4bb5-9432-928b2996f41d",
      },
      {
        id: "b7157aa5-8347-4434-a479-accac84664f6",
        recipeId: "04976cc3-ac2c-4441-9a93-19b52c1a8f6c",
        userId: "0732fbfe-c740-4621-8814-0876fca369ee",
      },
      {
        id: "efed0f62-368b-4cf7-b337-f67fe2e81fdc",
        recipeId: "9106d519-bc13-4eac-b221-ce6cb46b8170",
        userId: "1169a41f-3eb2-42d4-9f9b-d7cd7a37fc77",
      },
      {
        id: "34ec68d0-33d7-49b7-b1e5-cb85186fb63e",
        recipeId: "352fc0c7-bb27-476c-9d89-854821a7cb64",
        userId: "e2402551-1647-4848-99db-50d16004a208",
      },
      {
        id: "f7b67f60-bd68-438a-97e1-0814d85643d9",
        recipeId: "da310f2c-cfb7-4896-a0e3-46fc6b88da39",
        userId: "a91ac4bf-1106-45fb-bb88-173e01571fdb",
      },
      {
        id: "61c228a4-ee0b-4c2e-b742-e5e7b76aa79a",
        recipeId: "ff281627-ebac-46d2-affa-71ca9019a623",
        userId: "f0c33eaa-478f-4201-84be-4ff5b1e60505",
      },
      {
        id: "e9a27eb4-3f74-44bf-8fb4-d181db910c4c",
        recipeId: "d063d964-3655-4087-9ed3-24c0c2b26bcd",
        userId: "3d5f939f-870e-424c-b6b7-7e60e7a3d34a",
      },
      {
        id: "1f530793-2b26-4d31-9f0e-75d7a5426996",
        recipeId: "37bdbe3d-4710-4e07-83e9-0a1c96d1e547",
        userId: "c78e5320-2f95-4994-ae7e-8560ff3a3c32",
      },
      {
        id: "e39329cd-9106-476d-82d7-63b4615e9bc0",
        recipeId: "e07359d8-14dd-4a5f-8dbc-c18ea88c488c",
        userId: "633a21eb-30f7-4b7e-9cd3-135d69545e20",
      },
      {
        id: "3ebf49a0-60f8-4dfc-8318-809f2c758e36",
        recipeId: "d4f3f916-c202-4cb2-bfed-0339f241ca27",
        userId: "213b31b8-749c-4f2b-ad43-e737555eb83c",
      },
      {
        id: "6c4816f5-2bfe-4383-b0bd-fb45e22158c8",
        recipeId: "7da2a7e2-37c9-4111-9b54-3e220e618652",
        userId: "f5af37a1-8d4f-4aae-8869-6055fd35cc15",
      },
      {
        id: "f6d2a6e8-a576-42ca-a4f4-287b2fa60d01",
        recipeId: "8ea23174-1705-4328-9ff8-681dbfc913a4",
        userId: "5cbb74b4-f0cf-4aea-b160-a1abe125f338",
      },
      {
        id: "8532ad66-6770-4c6c-b79b-f853d06c80e6",
        recipeId: "ba0f7c60-e415-4e0f-96ed-54aa2bcc03d5",
        userId: "2a52ac24-07d9-4c70-8d17-5c3d89bff992",
      },
      {
        id: "7b412a11-2885-4d23-90f9-77d1acbb0333",
        recipeId: "9049edd8-dd29-40d6-a2e7-7e715245ab73",
        userId: "469ef2e1-4710-442d-867e-4168c306e186",
      },
      {
        id: "97b0b78b-1021-4954-9254-7224c824fa87",
        recipeId: "f38134fe-f7a1-4393-b357-d84123319416",
        userId: "9489616f-715d-4af3-bf9b-7f7bde52b3e7",
      },
      {
        id: "000a3133-d8a9-4445-9dcc-f076b145bcc2",
        recipeId: "645df710-98e0-4b5d-81ad-012ee97a62a1",
        userId: "e7e8db88-f13d-439f-bb8c-595011e54a77",
      },
      {
        id: "50541409-07c1-4cb3-b39f-69a673d4c608",
        recipeId: "2fb0a934-9c02-4592-90b8-6540866875ca",
        userId: "b01d65e5-bcd2-48aa-a53e-3937afe6f5ea",
      },
      {
        id: "de12b6bf-f9a5-4536-aab9-11dab4fe2158",
        recipeId: "4b8a584d-5767-4d85-b649-4169df43506e",
        userId: "9b027577-929b-486a-b334-279ac75176a9",
      },
      {
        id: "73a59adf-5520-43cd-add8-0ae81e4ec83e",
        recipeId: "4f6505fe-c8de-495a-aac8-1727719b46e1",
        userId: "343fa9bd-e0e8-47a1-88e4-aa397ebb164b",
      },
      {
        id: "6329952b-1fc1-4f37-b0f6-199781f42b60",
        recipeId: "121b090e-687d-4877-82d7-694882e9c90d",
        userId: "78c1ead7-72d5-4742-9b6e-9a081cbe2e65",
      },
      {
        id: "0131de88-c30a-4598-b5a2-6ed19c4f0741",
        recipeId: "2acdf646-5fe0-486c-8368-57d655bf9cf8",
        userId: "c8bc3670-202b-4b50-bdb7-da37bc68f74d",
      },
      {
        id: "7a21f3ad-cf6f-4dba-a7d1-977902057399",
        recipeId: "256d10ce-cd8e-4f72-8657-12cef3daa7ba",
        userId: "f6e84609-32a5-4e64-842b-7bbd96f7dd43",
      },
      {
        id: "17fe4b31-5b4d-43dc-bc9d-40fc70d91b30",
        recipeId: "97bf2307-7d42-4c89-b08d-7154dada6e46",
        userId: "c38124a2-ccef-4e6b-a6dd-8d5df97a58cb",
      },
    ],
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
