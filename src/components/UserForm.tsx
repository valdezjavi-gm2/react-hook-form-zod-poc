"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema, type UserFormData } from "@/schemas/userSchema";
import { useState } from "react";
import { TrashIcon } from "./icons";
import { RenderCounter } from "./RenderCounter";
import { ProgressIndicator } from "./ProgressIndicator";
import { FormField, Button, ButtonGroup } from "./FormElements";

export function UserForm() {
  const [step, setStep] = useState(1);

  const { register, handleSubmit, formState, trigger, reset, watch, setValue } =
    useForm<UserFormData>({
      resolver: zodResolver(userSchema),
      defaultValues: {
        hobbies: [""],
        address: {
          street: "",
          city: "",
          country: "",
          zipCode: "",
        },
      },
    });

  const { errors, isSubmitting } = formState;
  const hobbies = watch("hobbies");

  const onSubmit = async (data: UserFormData) => {
    try {
      console.log("Form submitted:", data);
      alert("Form submitted successfully!");
      reset();
      setStep(1);
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  const handleNext = async () => {
    const fieldsToValidate = [
      "name",
      "email",
      "age",
      "password",
      "confirmPassword",
    ] as const;
    const isStepValid = await trigger(fieldsToValidate);

    if (isStepValid) {
      setStep(2);
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  const addHobby = () => {
    if (hobbies.length < 5) {
      setValue("hobbies", [...hobbies, ""]);
    }
  };

  const removeHobby = (index: number) => {
    if (hobbies.length > 1) {
      setValue("hobbies", hobbies.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="flex gap-12">
      <div className="flex-1 bg-white rounded-xl shadow-lg p-8 border border-gray-200">
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
          {/* Progress indicator */}
          <ProgressIndicator currentStep={step} />
          
          {step === 1 && (
            /* Step 1: Account Information */
            <div className="space-y-6">
              <FormField
                id="name"
                label="Name"
                placeholder="Enter your name"
                registration={register("name")}
                error={errors.name?.message}
              />

              <FormField
                id="email"
                type="email"
                label="Email"
                placeholder="Enter your email"
                registration={register("email")}
                error={errors.email?.message}
              />

              <FormField
                id="age"
                type="number"
                label="Age"
                placeholder="Enter your age"
                registration={{
                  ...register("age", { valueAsNumber: true })
                }}
                error={errors.age?.message}
              />

              <FormField
                id="password"
                type="password"
                label="Password"
                placeholder="Enter your password"
                registration={register("password")}
                error={errors.password?.message}
              />

              <FormField
                id="confirmPassword"
                type="password"
                label="Confirm Password"
                placeholder="Confirm your password"
                registration={register("confirmPassword")}
                error={errors.confirmPassword?.message}
              />

              <Button
                type="button"
                onClick={handleNext}
                fullWidth
              >
                Continue to Additional Info
              </Button>
            </div>
          )}
          {step === 2 && (
            /* Step 2: Additional Information */
            <div className="space-y-6">
              {/* Address Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Address</h3>
                <FormField
                  id="street"
                  label="Street"
                  placeholder="Enter street"
                  registration={register("address.street")}
                  error={errors.address?.street?.message}
                />

                <FormField
                  id="city"
                  label="City"
                  placeholder="Enter city"
                  registration={register("address.city")}
                  error={errors.address?.city?.message}
                />

                <FormField
                  id="country"
                  label="Country"
                  placeholder="Enter country"
                  registration={register("address.country")}
                  error={errors.address?.country?.message}
                />

                <FormField
                  id="zipCode"
                  label="ZIP Code"
                  placeholder="Enter ZIP code"
                  registration={register("address.zipCode")}
                  error={errors.address?.zipCode?.message}
                />
              </div>

              {/* Hobbies Section */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">Hobbies</h3>
                  {hobbies.length < 5 && (
                    <Button
                      type="button"
                      onClick={addHobby}
                      variant="secondary"
                      className="text-sm"
                    >
                      Add Hobby
                    </Button>
                  )}
                </div>
                {hobbies.map((_, index) => (
                  <div key={index} className="flex gap-4 items-start">
                    <div className="flex-1">
                      <FormField
                        id={`hobby-${index}`}
                        label={`Hobby ${index + 1}`}
                        placeholder="Enter hobby"
                        registration={register(`hobbies.${index}`)}
                        error={errors.hobbies?.[index]?.message}
                      />
                    </div>
                    {index > 0 && (
                      <Button
                        type="button"
                        onClick={() => removeHobby(index)}
                        variant="secondary"
                        className="mt-8"
                      >
                        <TrashIcon />
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              <ButtonGroup>
                <Button
                  type="button"
                  onClick={handleBack}
                  variant="secondary"
                  fullWidth
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  fullWidth
                  isLoading={isSubmitting}
                >
                  Submit
                </Button>
              </ButtonGroup>
            </div>
          )}
        </form>
      </div>
      <RenderCounter
        formState={formState}
        className="self-start sticky top-8"
      />
    </div>
  );
}
