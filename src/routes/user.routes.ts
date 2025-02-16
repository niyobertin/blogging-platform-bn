import { Router } from "express";
import { getUsers, getUser, register, usersLogin } from "../controllers/user.contoller";
import { userRegisterSchema } from "../schema/register.schema";
import { validateSchema } from "../middleware/validator";
import { USerLoginSchema } from "../schema/userLogin.schema";
import { upload } from "../utils/upload";


const userRoutes = Router();
userRoutes.get('/',getUsers);
/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     description: Fetches a list of all users in the system.
 *     responses:
 *       200:
 *         description: Successfully retrieved users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 count:
 *                   type: integer
 *                   example: 5
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       username:
 *                         type: string
 *                       email:
 *                         type: string
 *       404:
 *         description: No users found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 404
 *                 data:
 *                   type: string
 *                   example: 'Users not found'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'Unexpected error'
 */
userRoutes.get('/:id',getUser);
/**
 * @swagger
 * /api/v1/users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     description: Fetches a specific user from the system by their unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to fetch.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully fetched the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: 'User fetched successfully'
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     username:
 *                       type: string
 *                     email:
 *                       type: string
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 404
 *                 data:
 *                   type: string
 *                   example: 'User not found'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'Unexpected error'
 */
userRoutes.post('/register', upload.single("profilePicture"), validateSchema(userRegisterSchema), register);
/**
 * @swagger
 * /api/v1/users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     description: Registers a new user into the system with provided details.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "john_doe123"
 *               email:
 *                 type: string
 *                 example: "john@gmail.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *               profilePicture:
 *                 type: string
 *                 format: binary
 *                 description: Profile picture to be uploaded (image or video)
 *               role:
 *                 type: string
 *                 example: "USER"
 *               firstName:
 *                 type: string
 *                 example: "John"
 *               lastName:
 *                 type: string
 *                 example: "Doe"
 *               location:
 *                 type: string
 *                 example: "123 Main St, Springfield"
 *               bio:
 *                 type: string
 *                 example: "Software Developer passionate about tech."
 *               phoneNumber:
 *                 type: string
 *                 example: "1234567890"
 *                 description: User's phone number (including country code)
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 201
 *                 message:
 *                   type: string
 *                   example: 'Registration successful!'
 *       400:
 *         description: User already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: 'User already exists'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'Unexpected error'
 */


userRoutes.post('/login', validateSchema(USerLoginSchema), usersLogin);
/**
 * @swagger
 * /api/v1/users/login:
 *   post:
 *     summary: User login
 *     tags: [Users]
 *     description: Authenticates a user and generates an access token upon successful login.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The user's username
 *                 example: "john_doe"
 *               phoneNumber:
 *                 type: string
 *                 description: The user's phone number (optional)
 *                 example: "0783334567098"
 *               password:
 *                 type: string
 *                 description: The user's password
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Successful login and token generation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: 'Welcome back!'
 *                 data:
 *                   type: object
 *                   properties:
 *                     username:
 *                       type: string
 *                       example: 'john_doe'
 *                     roles:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ['user', 'admin']
 *                     phoneNumber:
 *                       type: string
 *                       example: "0783334567098"
 *                 token:
 *                   type: string
 *                   example: 'jwt_token_here'
 *       401:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 401
 *                 message:
 *                   type: string
 *                   example: 'Invalid credentials!'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'Unexpected error'
 */

export default userRoutes;