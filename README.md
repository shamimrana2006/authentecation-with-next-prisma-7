# Authentication API

A robust authentication system built with NestJS, Prisma ORM, and PostgreSQL. This project provides a comprehensive user management and authentication solution with role-based access control.

## Features

- 🔐 User Authentication System
- 👥 User Management (CRUD Operations)
- 🎭 Role-Based Access Control (USER, ADMIN, VENDOR)
- 📧 Email & Phone Authentication Support
- 🗄️ PostgreSQL Database with Prisma ORM
- 🔄 Prisma Adapter for PostgreSQL
- ✅ Input Validation with class-validator
- 📝 API Documentation with Swagger
- 🐳 Docker Support

## Tech Stack

- **Framework**: NestJS 11.x
- **ORM**: Prisma 7.2.0
- **Database**: PostgreSQL
- **Validation**: class-validator & class-transformer
- **Documentation**: Swagger
- **Package Manager**: pnpm

## Database Schema

### User Model

```prisma
model User {
  id         Int      @id @default(autoincrement())
  email      String   @unique
  phone      String?  @unique
  name       String
  password   String
  avatar     String?

  // Address Information
  address    String?
  city       String?
  state      String?
  country    String?
  zipCode    String?

  // Account Status
  role       Role     @default(USER)
  isActive   Boolean  @default(true)
  isVerified Boolean  @default(false)

  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
}

enum Role {
  USER
  ADMIN
  VENDOR
}
```

## Prerequisites

- Node.js (v18 or higher)
- pnpm
- PostgreSQL
- Docker (optional)

## Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd authentication
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Environment Setup**

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/auth_db?schema=public"
PORT=3000
```

4. **Database Setup**

Run Prisma migrations:

```bash
# Run migrations
pnpm prisma migrate dev

# Generate Prisma Client
pnpm prisma generate
```

## Running the Application

```bash
# Development mode
pnpm run start:dev

# Development with auto-reload
pnpm run sdev

# Migrate, generate, and start (all in one)
pnpm run mgsdev

# Reset database and start fresh
pnpm run rmgsdev

# Production mode
pnpm run start:prod
```

The API will be available at `http://localhost:3000`

## Prisma Service

The Prisma service is configured as a global service that connects to PostgreSQL using the Prisma adapter:

```typescript
@Global()
@Injectable()
export class PrismaService implements OnModuleInit {
  private readonly prisma: PrismaClient;

  constructor() {
    const adapter = new PrismaPg({
      connectionString: process.env.DATABASE_URL,
    });

    this.prisma = new PrismaClient({ adapter });
  }

  async onModuleInit() {
    await this.prisma.$connect();
    console.log('database connected');
  }
}
```

### Features:

- ✅ Global module - available across the entire application
- ✅ Auto-connects on module initialization
- ✅ Uses Prisma PostgreSQL adapter
- ✅ Connection error handling

## API Endpoints

### User Management

| Method | Endpoint    | Description       |
| ------ | ----------- | ----------------- |
| POST   | `/user`     | Create a new user |
| GET    | `/user`     | Get all users     |
| GET    | `/user/:id` | Get user by ID    |
| PATCH  | `/user/:id` | Update user       |
| DELETE | `/user/:id` | Delete user       |

### Request Examples

**Create User**

```bash
POST /user
Content-Type: application/json

{
  "email": "user@example.com",
  "name": "John Doe",
  "password": "securePassword123",
  "phone": "+1234567890",
  "role": "USER"
}
```

## Project Structure

```
authentication/
├── prisma/
│   ├── schema/
│   │   ├── schema.prisma       # Main Prisma configuration
│   │   └── user.prisma         # User model schema
│   ├── migrations/             # Database migrations
│   └── generated/              # Generated Prisma client
├── src/
│   ├── prisma/
│   │   └── prisma.service.ts   # Prisma service
│   ├── user/
│   │   ├── dto/
│   │   │   ├── create-user.dto.ts
│   │   │   └── update-user.dto.ts
│   │   ├── user.controller.ts
│   │   ├── user.service.ts
│   │   └── user.module.ts
│   ├── app.module.ts
│   └── main.ts
├── docker-compose.yml          # Docker configuration
└── package.json
```

## Database Commands

```bash
# Run migrations
pnpm prisma migrate dev

# Generate Prisma Client
pnpm prisma generate

# Reset database
pnpm prisma migrate reset

# Open Prisma Studio (Database GUI)
pnpm prisma studio

# Check migration status
pnpm prisma migrate status
```

## Testing

```bash
# Unit tests
pnpm run test

# E2E tests
pnpm run test:e2e

# Test coverage
pnpm run test:cov

# Watch mode
pnpm run test:watch
```

## Docker Support

Start the application with Docker:

```bash
docker-compose up -d
```

## Development Scripts

| Script               | Description                      |
| -------------------- | -------------------------------- |
| `pnpm run start`     | Start the application            |
| `pnpm run start:dev` | Start in watch mode              |
| `pnpm run sdev`      | Start development server         |
| `pnpm run mgsdev`    | Migrate, generate & start dev    |
| `pnpm run rmgsdev`   | Reset, migrate, generate & start |
| `pnpm run build`     | Build for production             |
| `pnpm run lint`      | Lint and fix code                |
| `pnpm run format`    | Format code with Prettier        |

## API Documentation

Once the application is running, access the Swagger documentation at:

```
http://localhost:3000/api
```

## User Roles

- **USER**: Standard user with basic permissions
- **ADMIN**: Administrator with full access
- **VENDOR**: Vendor-specific permissions

## Security Features

- Password hashing (to be implemented)
- Email verification flag
- Account activation status
- Unique email and phone constraints

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is [UNLICENSED](LICENSE).

## Support

For support, email your-email@example.com or open an issue in the repository.

## Roadmap

- [ ] JWT Authentication
- [ ] Password hashing with bcrypt
- [ ] Email verification
- [ ] Password reset functionality
- [ ] OAuth2 integration
- [ ] Rate limiting
- [ ] API versioning
- [ ] Refresh tokens
- [ ] 2FA support

---

Built with ❤️ using NestJS and Prisma

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ pnpm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
