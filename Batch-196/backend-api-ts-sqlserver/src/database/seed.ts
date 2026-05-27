import { faker } from "@faker-js/faker"
import { myDataSource } from "../dataSource"
import { Brand } from "../entities/Brand.entity"
import { Category } from "../entities/Category.entity"
import { Product } from "../entities/Product.entity"

const categoriesData = [
  {
    categoryName: "Road",
    description: "Bicycles designed for paved roads",
  },
  {
    categoryName: "Mountain",
    description: "Off-road and trail bicycles",
  },
  {
    categoryName: "Hybrid",
    description: "Versatile bikes for various terrains",
  },
  {
    categoryName: "Cruiser",
    description: "Comfortable and stylish bikes for leisurely rides",
  },
  {
    categoryName: "Electric",
    description: "Bicycles powered by electric motors",
  },
]

const brandsData = [
  {
    brandName: "Trek",
    description: "High-quality bikes for all terrains",
  },
  {
    brandName: "Giant",
    description: "Specializing in road and mountain bikes",
  },
  {
    brandName: "Specialized",
    description: "Innovative designs for cycling enthusiasts",
  },
  {
    brandName: "Cannondale",
    description: "Known for its performance-oriented bicycles",
  },
  {
    brandName: "Scott",
    description: "Offers a wide range of bicycles for various purposes",
  },
]

const productNames = [
  "Road Bike",
  "Mountain Bike",
  "Hybrid Bike",
  "Cruiser Bike",
  "Electric Bike",
  "Road Bike Pro",
  "Mountain Bike Pro",
  "Hybrid Bike Pro",
  "Cruiser Bike Pro",
  "Electric Bike Pro",
  "Road Bike XL",
  "Mountain Bike XL",
  "Hybrid Bike XL",
  "Cruiser Bike XL",
  "Electric Bike XL",
]

const buildProductName = (index: number) => {
  const baseName = productNames[index % productNames.length]
  const suffix = Math.ceil((index + 1) / productNames.length)
  return suffix === 1 ? baseName : `${baseName} ${suffix}`
}

myDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
        seed();
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })


const seed = async () => {
  try {
  

    const brandRepo = myDataSource.getRepository(Brand)
    const categoryRepo = myDataSource.getRepository(Category)
    const productRepo = myDataSource.getRepository(Product)

    // Clean existing data in child-first order
    // await productRepo.clear()
    // await brandRepo.clear()
    // await categoryRepo.clear()

    const savedCategories = await categoryRepo.save(
      categoriesData.map((payload) => categoryRepo.create(payload)),
    )

    const savedBrands = await brandRepo.save(
      brandsData.map((payload) => brandRepo.create(payload)),
    )

    const products: Product[] = []
    for (let i = 0; i < 30; i += 1) {
      const category = faker.helpers.arrayElement(savedCategories)
      const brand = faker.helpers.arrayElement(savedBrands)
      const productName = buildProductName(i)

      const product = productRepo.create({
        productName,
        price:Number(faker.commerce.price({ min: 100, max: 2000 })),
        discount: Number(faker.number.int({ min: 0, max: 70 })),
        categoryId: category.id,
        brandId: brand.id,
        description: faker.commerce.productDescription(),
        modelYear: faker.number.int({ min: 2020, max: 2025 }),
        thumbnail: faker.image.urlLoremFlickr({ category: "bicycle", width: 640, height: 480 }),
        stock: faker.number.int({ min: 0, max: 200 }),
      })

      products.push(product)
    }

    await productRepo.save(products)
    console.log("Seeding finished: 5 brands, 5 categories, 30 products created.")
    process.exit(0)
  } catch (error) {
    console.error("Seed error:", error)
    process.exit(1)
  }
}
