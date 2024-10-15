import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateTicketDto {

    @IsString()
    @Length(11, 11, { message: 'OIB must be exactly 11 characters long' })
    vatin: string;

    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

}