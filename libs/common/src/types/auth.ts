/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "auth";

export interface SignInDto {
  email: string;
  password: string;
}

export interface SignUpDto {
  username: string;
  firstName?: string | undefined;
  lastName?: string | undefined;
  email: string;
  password: string;
}

export interface SignUpHttpResponse {
  id: string;
  firstName?: string | undefined;
  lastName?: string | undefined;
  username: string;
  email: string;
}

export interface SignInHttpResponse {
  id: string;
  firstName?: string | undefined;
  lastName?: string | undefined;
  username: string;
  email: string;
  token: string;
}

export const AUTH_PACKAGE_NAME = "auth";

export interface AuthServiceClient {
  signIn(request: SignInDto): Observable<SignInHttpResponse>;

  signUp(request: SignUpDto): Observable<SignUpHttpResponse>;
}

export interface AuthServiceController {
  signIn(request: SignInDto): Promise<SignInHttpResponse> | Observable<SignInHttpResponse> | SignInHttpResponse;

  signUp(request: SignUpDto): Promise<SignUpHttpResponse> | Observable<SignUpHttpResponse> | SignUpHttpResponse;
}

export function AuthServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["signIn", "signUp"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("AuthService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("AuthService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const AUTH_SERVICE_NAME = "AuthService";
