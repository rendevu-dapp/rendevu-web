"use client";

import { Button } from "@heroui/react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { ChangeEvent, FC, memo, useCallback, useRef, useState } from "react";

// Static assets
import imageUpload from "@/../public/images/image-upload.svg";

// Animation variants
import {
  childVariants,
  containerVariants,
  logoVariants,
} from "../animationVariants";

// Types
interface FormData {
  subject: string;
  body: string;
  email: string;
}

interface FormFieldProps {
  label: string;
  name: keyof FormData;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder: string;
  type?: "text" | "email";
  rows?: number;
}

// Constants
const INPUT_BASE_CLASSES =
  "w-full px-4 py-2 border border-gray-300 rounded-[12px] text-[#868E96] placeholder-[#DEE2E6] placeholder-italic focus:outline-none focus:ring-1 focus:ring-[#6B1ACF] resize-y";
const LABEL_BASE_CLASSES =
  "block text-sm font-bold text-[#868E96] dark:text-white mb-1";

// Reusable Form Field component
const FormField: FC<FormFieldProps> = memo(
  ({ label, name, value, onChange, placeholder, type = "text", rows }) => (
    <motion.div variants={childVariants}>
      <label htmlFor={name} className={LABEL_BASE_CLASSES}>
        {label}
      </label>
      {rows ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
          className={INPUT_BASE_CLASSES}
          aria-required="true"
        />
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={INPUT_BASE_CLASSES}
          aria-required="true"
        />
      )}
    </motion.div>
  ),
);

FormField.displayName = "FormField";

// Image Upload component
const ImageUpload: FC = () => {
  const handleFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("Selected file:", file.name);
    }
  }, []);

  return (
    <motion.div className="flex-1 mt-6 md:mt-0" variants={logoVariants}>
      <label
        htmlFor="image-upload"
        className="block text-[12px] font-semibold text-[#868E96] dark:text-white mb-1"
      >
        Add Image
      </label>
      <div className="relative w-full h-48 border border-gray-300 rounded-[12px] flex items-center justify-center">
        <div className="absolute top-2 right-2">
          <Image
            src={imageUpload}
            alt="Upload Icon"
            width={24}
            height={24}
            aria-hidden="true"
          />
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            aria-label="Upload an image"
          />
        </div>
      </div>
    </motion.div>
  );
};

// Main Contact component
const ContactArea: FC = () => {
  const [formData, setFormData] = useState<FormData>({
    subject: "",
    body: "",
    email: "",
  });

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    [],
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      console.log("Form submitted:", formData);
    },
    [formData],
  );

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      className="w-full dark:bg-gray-900 flex flex-col items-center justify-center py-10"
      aria-label="Contact Help and Support"
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <div className="w-full max-w-6xl px-4 sm:px-6">
        <motion.h2
          className="text-[35px] md:text-[48px] mb-12 font-extrabold text-[#343A40] dark:text-white self-start sm:px-6"
          variants={childVariants}
        >
          Contact Help & <br /> Support.
        </motion.h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row md:space-x-6">
            <div className="flex-1 space-y-4">
              <FormField
                label="Subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="Enter Name Here..."
              />
              <FormField
                label="Body"
                name="body"
                value={formData.body}
                onChange={handleInputChange}
                placeholder="Enter Text Here..."
                rows={3}
              />
              <FormField
                label="Email Address"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter Text Here..."
                type="email"
              />
            </div>
            <ImageUpload />
          </div>
          <motion.div
            className="mt-6 flex justify-end"
            variants={childVariants}
          >
            <Button
              type="submit"
              className="px-5 py-7 text-[12px] bg-[#6B1ACF] cursor-pointer text-white font-semibold rounded-full hover:bg-purple-700 w-full sm:w-auto"
            >
              Send Now
            </Button>
          </motion.div>
        </form>
      </div>
    </motion.section>
  );
};

export default ContactArea;
