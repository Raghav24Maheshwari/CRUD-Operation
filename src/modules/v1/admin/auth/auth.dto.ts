import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Invalid Credentials' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Invalid Credentials' })
  password: string;

  @IsString({ message: 'Access must be a string' })
  @IsNotEmpty({ message: 'Access is required' })
  @IsEnum(['admin', 'owner', 'manager', 'driver', 'customer'], {
    message: 'Invalid access type',
  })
  access: 'admin' | 'owner' | 'manager' | 'driver' | 'customer';
}

export class AddDto {
  @IsString({ message: 'First name must be a string' })
  @IsNotEmpty({ message: 'First name is required' })
  first_name: string;

  @IsString({ message: 'Last name must be a string' })
  @IsNotEmpty({ message: 'Last name is required' })
  last_name: string;

  @IsEmail({}, { message: 'Please provide a valid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;

  @IsString({ message: 'Mobile number must be a string' })
  @IsNotEmpty({ message: 'Mobile number is required' })
  mobile: string;

  @IsString({ message: 'Country code must be a string' })
  @IsNotEmpty({ message: 'Country code is required' })
  country_code: string;
}

export class ChangePasswordDto {
  @IsString({ message: 'Old password must be a string' })
  @IsNotEmpty({ message: 'Old password is required' })
  old_password: string;

  @IsString({ message: 'New password must be a string' })
  @IsNotEmpty({ message: 'New password is required' })
  @MinLength(8, { message: 'New password must be at least 8 characters long' })
  new_password: string;
}

export class UpdateProfileDto {
  @IsString({ message: 'First name must be a string' })
  @IsNotEmpty({ message: 'First name is required' })
  first_name: string;

  @IsString({ message: 'Last name must be a string' })
  @IsNotEmpty({ message: 'Last name is required' })
  last_name: string;

  @IsNotEmpty({ message: 'is_deleted_profile is required' })
  // @IsBoolean({ message: 'is_deleted_profile must be a boolean' })
  is_deleted_profile: boolean;

  @IsOptional()
  profile_pic?: {
    fileName: string;
    base64: string;
    size?: string;
    type?: string;
  };

  @IsString({ message: 'Mobile number must be a string' })
  @IsOptional()
  mobile?: string;

  @IsString({ message: 'Country code must be a string' })
  @IsNotEmpty({ message: 'Country code is required' })
  country_code: string;
}

export class ForgotPasswordDto {
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;
}

export class ResetPasswordDto {
  @IsString({ message: 'New password must be a string' })
  @IsNotEmpty({ message: 'New password is required' })
  @MinLength(8, { message: 'New password must be at least 8 characters long' })
  new_password: string;

  @IsString({ message: 'Code must be a string' })
  @IsNotEmpty({ message: 'Code is required' })
  code: string;
}
