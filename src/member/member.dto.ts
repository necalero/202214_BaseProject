/* eslint-disable prettier/prettier */
import {IsNotEmpty, IsString, IsUrl} from 'class-validator';
export class MemberDto {

 @IsString()
 @IsNotEmpty()
 readonly username: string;
 
 @IsString()
 @IsNotEmpty()
 readonly email: string;
 
 @IsString()
 @IsNotEmpty()
 readonly birthdate: string;
 
}