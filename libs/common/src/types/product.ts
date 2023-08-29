/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "product";

export interface Empty {
}

export interface Product {
  id: string;
  name: string;
}

export interface Products {
  products: Product[];
}

export const PRODUCT_PACKAGE_NAME = "product";

export interface ProductServiceClient {
  findAllProducts(request: Empty): Observable<Products>;
}

export interface ProductServiceController {
  findAllProducts(request: Empty): Promise<Products> | Observable<Products> | Products;
}

export function ProductServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["findAllProducts"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("ProductService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("ProductService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const PRODUCT_SERVICE_NAME = "ProductService";
