

"use client";

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ChevronDown, Upload, Check, AlertCircle, AlertTriangle, Award, ThumbsUp } from 'lucide-react';
import { Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";
import { Progress } from "@nextui-org/react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { toast } from 'sonner';
import { useAccount, useChainId, usePublicClient, useWriteContract } from 'wagmi';
import { useRouter } from 'next/navigation';
import { encodeAbiParameters, pad, parseUnits, PublicClient, zeroAddress } from 'viem';
import { SEPOLIA_ARBITRUM_CHAIN_ID } from '@/constants';
import { NormalTxStatus, useNormalTransactionStore } from '@/zustand-store';
import { useWriteTokenFactoryCreateTokenAndVote } from '@/generated';
import { useUploadThing } from '@/lib/useUploadthing';
import { TokenFactoryService } from '@/hooks/allContractVariables';
import { Card, Image as NextUIImage } from "@nextui-org/react";
import { ChevronUp } from "lucide-react";
import {  Modal, ModalBody, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import { FileUpload } from "@/components/file-upload";
import { cn } from "@/lib/utils";
import React, { useRef} from "react";
import { IconUpload } from "@tabler/icons-react";

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}
const tokenFactory = new TokenFactoryService(421614); // Arbitrum Sepolia chainId

const formSchema = z.object({
    name: z.string().min(2, { message: "Token name must be at least 2 characters." }),
    ticker: z.string().min(1, { message: "Ticker is required." }).max(10, { message: "Ticker must not exceed 10 characters." }),
    description: z.string().min(10, { message: "Description must be at least 10 characters." }),
    image: z.any().optional(),
    twitter: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal('')),
    telegram: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal('')),
    website: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal('')),
    ethAmount: z.number()
        .refine(async (amount) => {
            const minAmount = await tokenFactory.getBaseTokenCreationFee();
            if (amount < Number(minAmount)) {
                toast.error(`ETH amount must be at least ${minAmount} ETH`);
                return false;
            }
            return true;
        }),
});
type FormValues = z.infer<typeof formSchema>;
const mainVariant = {
  initial: {
    x: 0,
    y: 0,
  },
  animate: {
    x: 20,
    y: -20,
    opacity: 0.9,
  },
};

const secondaryVariant = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
};


export default function TokenSubmissionForm({
  onChange,
}: {
  onChange?: (files: File[]) => void;
}) {
  // Move all hooks to the top level
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [deployError, setDeployError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [minAmount, setMinAmount] = useState<string>('0');
  const [errors, setErrors] = useState<Array<{ id: number, error: unknown, name: string }>>([]);
  const [formReady, setFormReady] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { address: userAddress } = useAccount();
  const chainId = useChainId();
  const { addNormalTransaction } = useNormalTransactionStore();

  // Initialize form before any other hooks
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      ticker: '',
      description: '',
      twitter: '',
      telegram: '',
      website: '',
      ethAmount: 0,
    },
    mode: 'onChange'
  });

  const { isValid } = form.formState;
  const handleFileChange = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setFiles(acceptedFiles);
      
      // Clean up preview URL when component unmounts
      return () => URL.revokeObjectURL(previewUrl);
    }
  }, [setFiles]);

  // Initialize dropzone after form
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleFileChange,
    accept: {
      'image/*': ['.jpeg', '.png', '.jpg', '.gif']
    },
    maxFiles: 1
  });

  const { startUpload, isUploading } = useUploadThing("imageUploader");
  const { data: hash, writeContractAsync: createTokenAndAddVote, isPending: isWritePending } = useWriteTokenFactoryCreateTokenAndVote();


  const handleSuccess = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  
    const handleClick = () => {
      fileInputRef.current?.click();
    }

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            form.setValue('image', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    }, [form]);
    const removeError = (id: number) => {
        setErrors(prev => prev.filter(e => e.id !== id));
    };

  
    async function onSubmit(data: FormValues) {
      try {
        setDeployError(null);
    
        if (!userAddress) {
          setDeployError('Please connect your wallet first');
          toast.error('Please connect your wallet to continue.');
          return;
        }
    
        let imageUrl = '';
        const preparingTokenToast = toast.info("Preparing to create token...");
    
        // Check if an image file was uploaded
        if (data.image instanceof File) {
          const uploadToast = toast.loading("Uploading image...");
          try {
            const uploadedFiles = await startUpload([data.image]);
            if (uploadedFiles && uploadedFiles.length > 0) {
              imageUrl = uploadedFiles[0].url; // Set the image URL from the upload response
              toast.success("Image uploaded successfully!");
            } else {
              setDeployError('Image upload failed');
              toast.error("Image upload failed. Please try again.");
              return;
            }
          } catch (error) {
            console.error("Image upload error:", error);
            setDeployError('Failed to upload image');
            toast.error("Failed to upload image. Please try again.");
            return;
          } finally {
            toast.dismiss(uploadToast);
          }
        } else {
          setDeployError('Image URL is required');
          toast.error("Image URL is required");
          return;
        }
    
        // Ensure the image URL is valid before proceeding
        if (!imageUrl) {
          setDeployError('Image URL is required');
          toast.error("Image URL is required");
          return;
        }
    
        const ethAmount = parseUnits(data.ethAmount.toString(), 18);
        
        const tokenParams = {
          userAddress: userAddress,
          name: data.name,
          symbol: data.ticker,
          description: data.description,
          imageUrl: imageUrl,
          twitter: data.twitter || 'non',
          telegram: data.telegram || 'non',
          website: data.website || 'non'
        };
    
        if (chainId === SEPOLIA_ARBITRUM_CHAIN_ID) {
          await createTokenAndAddVote(
            { args: [tokenParams], value: ethAmount },
            {
              onSuccess: async (data) => {
                toast.success('Token creation initiated. Waiting for confirmation...');
                addNormalTransaction({
                  hash: data,
                  status: NormalTxStatus.PENDING,
                  additionalData: {
                    type: 'tokenCreation',
                    tokenAmount: "1000000000",
                    ethAmount: form.getValues('ethAmount').toString(),
                    tokenName: form.getValues('name'),
                    tokenTicker: form.getValues('ticker'),
                    transactionHash: data,
                  }
                });
                handleSuccess();
              },
              onError: (error) => {
                console.error('Contract write error:', error);
                setDeployError(error.message || 'Failed to create token');
                setErrors([
                  ...errors,
                  { id: new Date().getTime(), name: 'Error Creating Token', error }
                ]);
                toast.error('There was an error creating the token. Please try again.');
              }
            }
          );
        } else {
          setDeployError('Unsupported chain');
          toast.error('Unsupported chain. Please switch to Arbitrum Sepolia.');
        }
      } catch (error) {
        console.error('Submission error:', error);
        setDeployError('An unexpected error occurred');
        toast.error('An unexpected error occurred. Please try again.');
      } finally {
        toast.dismiss();
      }
    }


const SubmitButton: React.FC<CustomButtonProps> = ({ 
  children, 
  isLoading,
  disabled,
  ...props 
}) => (
  <div className="w-full">
    <button 
      {...props} 
      disabled={disabled || isLoading}
      className='flex flex-row w-full shake-button'
    >
      <div className="top-9 left-[1305.31px] w-[2.84px] h-[36.22px] bg-[#787878] border-t-[0.63px] border-solid border-black" />
      <div className='flex flex-col flex-grow'>
        <div className="w-full h-[33.39px] top-9 left-[1307.83px] bg-[#787878] items-center shadow-md flex justify-center">
          <span className="text-[#F7F2DA] text-xl font-normal leading-5 text-center">
            {isLoading ? "Processing..." : children}
          </span>
        </div>
        <div className="top-[69.7px] left-[1305px] w-full h-[3.15px] bg-[#787878] border-t-[0.63px] border-solid border-black" />
      </div>
    </button>
    {deployError && (
      <div className="mt-2 text-red-500 text-sm">
        {deployError}
      </div>
    )}
  </div>
);

    return (
<div className="min-h-screen mt-8 text-gray-300 p-4">
<style jsx global>{`
  input:focus,
  textarea:focus {
    outline: none;
    border-color: #F7F2DA !important;
  }
`}</style>

<main className="max-w-3xl mx-auto ">
  <h1 className="text-xl md:text-2xl sm:text-3xl text-center mb-8 sm:mb-12">Fill the details to kick off your new token</h1>
  <form  onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
    <div className="flex flex-col w-full gap-4 md:hidden">
      <div>
        <label className="block mb-2">Name</label>
        <input
          type="text"
          {...form.register("name")}
          placeholder="Token name"
          className="w-full md:w-1/2 bg-black rounded p-2 border border-gray-700"
              required
        />
           {form.formState.errors.name && (
                <p className="text-danger text-sm">{form.formState.errors.name.message}</p>
              )}
      </div>
      <div>
        <label className="block mb-2">Ticker</label>
        <input
          type="text"
     
          className="w-full md:w-1/2 bg-black rounded p-2 border border-gray-700"
          {...form.register("ticker")}
          placeholder="Token ticker"
          required
        />
           {form.formState.errors.ticker && (
                <p className="text-danger text-sm">{form.formState.errors.ticker.message}</p>
              )}
      </div>
    </div>
    <div className="md:flex hidden space-x-4">
      <div className="flex-1">
        <label className="block mb-2">Name</label>
        <input
          type="text"
          placeholder="Token name"
          className="w-full bg-black rounded p-2 border border-gray-700"
          {...form.register("name")}
          required
        />
           {form.formState.errors.name && (
                <p className="text-danger text-sm">{form.formState.errors.name.message}</p>
              )}
      </div>
      <div className="flex-1">
        <label className="block mb-2">Ticker</label>
        <input
          type="text"
          placeholder="Token ticker"
          className="w-full bg-black rounded p-2 border border-gray-700"
          {...form.register("ticker")}
          required
        />
          {form.formState.errors.ticker && (
                <p className="text-danger text-sm">{form.formState.errors.ticker.message}</p>
              )}
      </div>
    </div>
    <div>
      <label className="block mb-2">Description</label>
      <textarea
        placeholder="Token description"
        className="w-full bg-black rounded p-2 border border-gray-700 h-24 md:h-32"
        {...form.register("description")}
        required
      ></textarea>
    </div>
    <div>
      <label className="block mb-2">Image</label>
      <div className="w-full" {...getRootProps()}>
      <motion.div
        onClick={handleClick}
        whileHover="animate"
        className="px-2 group/file block rounded-lg cursor-pointer w-full relative overflow-hidden"
      >
      <input
      ref={fileInputRef}
      id="file-upload-handle"
      {...getInputProps()}
      type="file"
      onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
      className="hidden"
      aria-label='number'
    />
         
        <div className="flex flex-col items-center justify-center w-full">
          <div className="relative w-full  mx-auto">
            {files.length > 0 &&
              files.map((file, idx) => (
                <motion.div
                  key={"file" + idx}
                  layoutId={idx === 0 ? "file-upload" : "file-upload-" + idx}
                  className={cn(
                    "relative overflow-hidden z-40 bg-white dark:bg-neutral-900 flex flex-col items-start justify-start md:h-24 p-4 mt-4 w-full mx-auto rounded-md",
                    "shadow-sm"
                  )}
                >
                  <div className="flex justify-between w-full items-center gap-4">
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className="text-base text-neutral-700 dark:text-neutral-300 truncate max-w-xs"
                    >
                      {file.name}
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className="rounded-lg px-2 py-1 w-fit flex-shrink-0 text-sm text-neutral-600 dark:bg-neutral-800 dark:text-[#F7F2DA] shadow-input"
                    >
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </motion.p>
                  </div>

                  <div className="flex text-sm md:flex-row flex-col items-start md:items-center w-full mt-2 justify-between text-neutral-600 dark:text-neutral-400">
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 "
                    >
                      {file.type}
                    </motion.p>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                    >
                      modified{" "}
                      {new Date(file.lastModified).toLocaleDateString()}
                    </motion.p>
                  </div>
                </motion.div>
              ))}
            {!files.length && (
              <motion.div
                layoutId="file-upload"
                variants={mainVariant}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                className={cn(
                  "relative group-hover/file:shadow-2xl z-40 bg-white dark:bg-neutral-900 flex flex-col items-center justify-center h-64 mt-4 w-full mx-auto rounded-md",
                  "shadow-[0px_10px_50px_rgba(0,0,0,0.1)]"
                )}
              >
                {isDragActive ? (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-neutral-600 flex flex-col items-center"
                  >
                    Drop it
                    <IconUpload className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
                  </motion.p>
                ) : (
                  <>
                    <IconUpload className="h-8 w-8 text-neutral-600 dark:text-neutral-300 mb-4" />
                    <p className="text-center text-neutral-600 dark:text-neutral-300">Click to upload or drag and drop</p>
                    <p className="text-sm text-center text-gray-500 mt-2">PNG, JPG or GIF (MAX. 800x400px)</p>
                  </>
                )}
              </motion.div>
            )}

            {!files.length && (
              <motion.div
                variants={secondaryVariant}
                className="absolute opacity-0 border border-dashed border-sky-400 inset-0 z-30 bg-transparent flex items-center justify-center h-64 mt-4 w-full mx-auto rounded-md"
              ></motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
    </div>
    <div className="flex space-x-4">
      <div className="flex-1">
        <label className="block mb-2">ETH Amount to stake</label>
        <input
          type="number"
        
          className="w-full bg-black rounded p-2 border border-gray-700"
       
          step="0.01"
          placeholder={`Minimum ${minAmount} ETH`}
          defaultValue=""
          {...form.register("ethAmount", {
            valueAsNumber: true,
            required: "ETH amount is required"
          })}
          required
        />
          {form.formState.errors.ethAmount && (
    <p className="text-danger text-sm mt-1">
      {form.formState.errors.ethAmount.message}
    </p>
  )}
      </div>
    </div> 
    <button
      type="button"
      className="w-full bg-black border border-gray-700 text-[#F7F2DA] p-2 rounded flex items-center justify-center hover:bg-gradient-to-r from-slate-500 to-slate-700 transition-colors duration-300"
      onClick={() => setShowMoreOptions(!showMoreOptions)}
    >
      
      {showMoreOptions ? (
        <>
          Hide More Options
          <ChevronUp className="ml-2 h-4 w-4" />
        </>
      ) : (
        <>
          Show More Options
          <ChevronDown className="ml-2 h-4 w-4" />
        </>
      )}
    </button>
    {showMoreOptions && (
      <>
        <div>
          <label className="block mb-2">Twitter Link</label>
          <input
            type="text"
            placeholder="https://twitter.com/..."
            className="w-full bg-black rounded p-2 border border-gray-700"
            {...form.register("twitter")}
          />
        </div>
        <div>
          <label className="block mb-2">Telegram Link</label>
          <input
            type="text"
            placeholder="https://t.me/..."
            className="w-full bg-black rounded p-2 border border-gray-700"
            {...form.register("telegram")}
          />
        </div>
        <div>
          <label className="block mb-2">Website</label>
          <input
            type="text"
            placeholder="https://..."
            className="w-full bg-black rounded p-2 border border-gray-700"
            {...form.register("website")}
          />
        </div>
      </>
    )}

<SubmitButton 
  type="submit"
  disabled={!isValid || isUploading || isWritePending}
  isLoading={isUploading || isWritePending}
>
  DEPLOY TOKEN
</SubmitButton>
  </form>
</main>

<Modal 
        isOpen={isModalOpen} 
        onClose={closeModal}
        className="bg-gray-800 border border-gray-600"
      >
        <ModalHeader className="text-[#F7F2DA]">Success</ModalHeader>
        <ModalBody>
          <p className="text-[#F7F2DA]">
            Your token has been successfully created!
          </p>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onPress={closeModal}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
</div>
    )
          }
