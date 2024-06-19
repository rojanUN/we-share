// import { NextFunction, Request, Response } from "express";

// class Guard {
//     private static instance: Guard;

//     private constructor() { }

//     static get(): Guard {
//         if (!Guard.instance) {
//             Guard.instance = new Guard();
//         }
//         return Guard.instance;
//     }

//     private auth = async (token: string): Promise<UserInterface | undefined> => {
//         try {
//             const verify = await AwsCognito.verifyToken(token);
//             const userExists = await new UserService().findOne({
//                 sub: verify.sub,
//             });
//             if (!userExists) {
//                 throw Boom.unauthorized(`Auth Failed`, token, {
//                     message: `Token is invalid or user doesn't exits `,
//                     path: "authorization",
//                 });
//             }
//             if (!userExists.emailVerified) {
//                 return this.verifyUser(userExists.id, token);
//             }
//             return userExists;
//         } catch (error: any) {
//             console.log(error);

//             if (error.failedAssertion) {
//                 return undefined;
//             } else {
//                 throw Boom.unauthorized(`Auth Failed`, token, {
//                     message: `Auth failed `,
//                     path: "authorization",
//                 });
//             }
//         }
//     };

//     private verifyUser = async (
//         id: number,
//         token: string
//     ): Promise<UserInterface> => {
//         const cognitoUser = await AwsCognito.getCognitoUser(token);
//         if (!cognitoUser) {
//             throw Boom.unauthorized("Auth Failed", token, {
//                 message: "Auth Failed",
//                 path: "authorization",
//             });
//         }
//         const { emailVerified } = this.formatCognitoUser({
//             cognitoUser: cognitoUser,
//         });
//         return new UserService().updateOne(id, {
//             emailVerified,
//         });
//     };

//     grant = async (req: Request, res: Response, next: NextFunction) => {
//         const token = req.headers?.authorization as string;
//         if (!token) {
//             throw Boom.unauthorized("Auth Failed", token, {
//                 message: "Token not provided",
//                 path: "authorization",
//             });
//         }

//         const user = await this.auth(token.replace("Bearer ", ""));
//         if (!user) {
//             throw Boom.unauthorized(`Auth Failed`, token, {
//                 message: `Auth Failed`,
//                 path: "authorization",
//             });
//         }
//         req.headers.user = user as any;
//         next();
//     };
// }

// const guard = Guard.get();

// export { guard as Guard };
