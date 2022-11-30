import { UseInterceptors, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { plainToClass } from "class-transformer";

interface ClassConstructor {
  new(...args: any[]): {}
}

export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto))
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) { }
  intercept(context: ExecutionContext, handler: CallHandler<any>): Observable<any> {
    // Runs before request is handled by request handler

    return handler.handle().pipe(
      map((data: any) => {
        // Runs before the response is sent out
        return plainToClass(this.dto, data, {
          excludeExtraneousValues: true
        })
      })
    )
  }
}