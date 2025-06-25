import { ApiProperty } from '@nestjs/swagger';

export class loginDto {
  @ApiProperty({
    example: 'name@gmail.com',
  })
  email: string;

  @ApiProperty({
    example: '123',
  })
  password: string;
}
