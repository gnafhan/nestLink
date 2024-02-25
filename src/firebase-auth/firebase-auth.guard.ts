// firebase-auth.guard.ts

import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import * as admin from "firebase-admin";

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authToken = request.headers.authorization;

    if (!authToken) {
      throw new UnauthorizedException('Authorization token not found');
    }

    const [bearer, idToken] = authToken.split(' ');

    if (bearer !== 'Bearer' || !idToken) {
      throw new UnauthorizedException('Invalid authorization header format');
    }

    try {
      request.user = await admin.auth().verifyIdToken(idToken); // Set the decoded token on the request object
      return true;
    } catch (error) {
      throw new UnauthorizedException(error?.code ?? "error");
    }
  }
}
