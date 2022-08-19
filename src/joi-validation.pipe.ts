import { ArgumentMetadata, Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { ObjectSchema } from "@hapi/joi";

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema){}

  transform(value: any, metadata: ArgumentMetadata) { //This method receives the data to transform and validate
    const { error } = this.schema.validate(value, { //TODO!! See this later!!
      abortEarly: false,
      allowUnknown: true,
      stripUnknown: true
  });
    if(error){
      throw new BadRequestException('Validation failed');
    }
    return value;
  }
}
