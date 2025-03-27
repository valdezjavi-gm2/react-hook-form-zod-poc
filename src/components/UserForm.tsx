'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema, type UserFormData } from "@/schemas/userSchema";
import { useState } from "react";
import { ErrorIcon, EyeIcon, EyeSlashIcon, TrashIcon } from "./icons";

export function UserForm() {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [hobbies, setHobbies] = useState<string[]>([""]);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    trigger,
    getValues,
    reset,
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      hobbies: [""],
      address: {
        street: "",
        city: "",
        country: "",
        zipCode: "",
      }
    }
  });

  const onSubmit = async (data: UserFormData) => {
    try {
      console.log("Form submitted:", data);
      reset();
      setStep(1);
      setShowPassword(false);
      setShowConfirmPassword(false);
      setHobbies([""]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleNext = async () => {
    const fieldsToValidate = ['name', 'email', 'age', 'password', 'confirmPassword'] as const;
    const isStepValid = await trigger(fieldsToValidate);
    
    if (isStepValid) {
      setStep(2);
    }
  };

  const handleBack = () => {
    setStep(1);
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const addHobby = () => {
    if (hobbies.length < 5) {
      setHobbies([...hobbies, ""]);
    }
  };

  const removeHobby = (index: number) => {
    if (hobbies.length > 1) {
      setHobbies(hobbies.filter((_, i) => i !== index));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className={`rounded-full h-8 w-8 flex items-center justify-center ${
              step === 1 ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-600'
            }`}>
              1
            </div>
            <div className={`ml-2 text-sm font-medium ${
              step === 1 ? 'text-gray-900' : 'text-gray-500'
            }`}>
              Account Info
            </div>
          </div>
          <div className="flex-1 mx-4 h-0.5 bg-gray-200">
            <div className={`h-full bg-blue-600 transition-all duration-300 ${
              step === 2 ? 'w-full' : 'w-0'
            }`} />
          </div>
          <div className="flex items-center">
            <div className={`rounded-full h-8 w-8 flex items-center justify-center ${
              step === 2 ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-600'
            }`}>
              2
            </div>
            <div className={`ml-2 text-sm font-medium ${
              step === 2 ? 'text-gray-900' : 'text-gray-500'
            }`}>
              Additional Info
            </div>
          </div>
        </div>
      </div>

      {step === 1 ? (
        /* Step 1: Account Information */
        <div className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-base font-semibold text-gray-900 mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              {...register("name")}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 shadow-sm"
            />
            {errors.name && (
              <p className="mt-2 text-sm text-red-600 flex items-center">
                <ErrorIcon />
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-base font-semibold text-gray-900 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              {...register("email")}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 shadow-sm"
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-600 flex items-center">
                <ErrorIcon />
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="age" className="block text-base font-semibold text-gray-900 mb-2">
              Age
            </label>
            <input
              type="number"
              id="age"
              placeholder="Enter your age"
              {...register("age", { valueAsNumber: true })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 shadow-sm"
            />
            {errors.age && (
              <p className="mt-2 text-sm text-red-600 flex items-center">
                <ErrorIcon />
                {errors.age.message}
              </p>
            )}
          </div>

          <div className="relative">
            <label htmlFor="password" className="block text-base font-semibold text-gray-900 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                {...register("password")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 shadow-sm pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {showPassword ? <EyeIcon /> : <EyeSlashIcon />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-2 text-sm text-red-600 flex items-center">
                <ErrorIcon />
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="relative">
            <label htmlFor="confirmPassword" className="block text-base font-semibold text-gray-900 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                placeholder="Confirm your password"
                {...register("confirmPassword")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 shadow-sm pr-12"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {showConfirmPassword ? <EyeIcon /> : <EyeSlashIcon />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-2 text-sm text-red-600 flex items-center">
                <ErrorIcon />
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={handleNext}
            className="w-full rounded-lg bg-blue-600 py-3 px-4 text-white font-semibold text-base hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition-colors duration-200"
          >
            Continue to Additional Info
          </button>
        </div>
      ) : (
        /* Step 2: Additional Information */
        <div className="space-y-6">
          {/* Address Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Address</h3>
            <div>
              <label htmlFor="street" className="block text-base font-semibold text-gray-900 mb-2">
                Street
              </label>
              <input
                type="text"
                id="street"
                placeholder="Enter street address"
                {...register("address.street")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 shadow-sm"
              />
              {errors.address?.street && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <ErrorIcon />
                  {errors.address.street.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="city" className="block text-base font-semibold text-gray-900 mb-2">
                City
              </label>
              <input
                type="text"
                id="city"
                placeholder="Enter city"
                {...register("address.city")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 shadow-sm"
              />
              {errors.address?.city && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <ErrorIcon />
                  {errors.address.city.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="country" className="block text-base font-semibold text-gray-900 mb-2">
                Country
              </label>
              <input
                type="text"
                id="country"
                placeholder="Enter country"
                {...register("address.country")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 shadow-sm"
              />
              {errors.address?.country && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <ErrorIcon />
                  {errors.address.country.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="zipCode" className="block text-base font-semibold text-gray-900 mb-2">
                ZIP Code
              </label>
              <input
                type="text"
                id="zipCode"
                placeholder="Enter ZIP code"
                {...register("address.zipCode")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 shadow-sm"
              />
              {errors.address?.zipCode && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <ErrorIcon />
                  {errors.address.zipCode.message}
                </p>
              )}
            </div>
          </div>

          {/* Hobbies Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Hobbies</h3>
              {hobbies.length < 5 && (
                <button
                  type="button"
                  onClick={addHobby}
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm focus:outline-none"
                >
                  + Add Hobby
                </button>
              )}
            </div>
            
            {hobbies.map((_, index) => (
              <div key={index} className="flex gap-2">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Enter a hobby"
                    {...register(`hobbies.${index}`)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 shadow-sm"
                  />
                  {errors.hobbies?.[index] && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <ErrorIcon />
                      {errors.hobbies[index]?.message}
                    </p>
                  )}
                </div>
                {hobbies.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeHobby(index)}
                    className="self-start p-3 text-gray-400 hover:text-gray-600 focus:outline-none"
                  >
                    <TrashIcon />
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={handleBack}
              className="flex-1 rounded-lg bg-gray-100 py-3 px-4 text-gray-700 font-semibold text-base hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 rounded-lg bg-blue-600 py-3 px-4 text-white font-semibold text-base hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition-colors duration-200"
            >
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
