/* eslint-disable prettier/prettier */
import {IsNotEmpty, IsString, IsUrl} from 'class-validator';
export class ClubDto {

 @IsString()
 @IsNotEmpty()
 readonly name: string;
 
 @IsString()
 @IsNotEmpty()
 readonly foundationDate: string;
 
 @IsUrl()
 @IsNotEmpty()
 readonly image: string;
 
 @IsString()
 @IsNotEmpty()
 readonly description: string;
 
}