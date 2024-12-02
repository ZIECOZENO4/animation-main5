

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

export default function TokenSubmissionForm() {
    const [showMoreOptions, setShowMoreOptions] = useState(false);
    const { address: userAddress } = useAccount();
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const chainId = useChainId();
    const { addNormalTransaction } = useNormalTransactionStore();
    const [errors, setErrors] = useState<Array<{ id: number, error: unknown, name: string }>>([]);




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
    });

    const { startUpload, isUploading } = useUploadThing("imageUploader");

    const { data: hash,
        error: writeError,
        writeContractAsync: createTokenAndAddVote,
        isPending: isWritePending,
        isSuccess: isWriteSuccess
    } = useWriteTokenFactoryCreateTokenAndVote();


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

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            //all of the image extensions
            'image/*': ['.jpeg', '.png', '.jpg']
        },
        maxFiles: 1,
    });






    const removeError = (id: number) => {
        setErrors(prev => prev.filter(e => e.id !== id));
    };



    async function onSubmit(data: FormValues) {
        if (!userAddress) {
            toast.error('Please connect your wallet to like the comment.');
            return;
        }
        let imageUrl = '';
        const preparingTokenToast = toast.info("Preparing to create token...");

        if (data.image instanceof File) {

            toast.loading("Uploading image...");
            try {
                const uploadedFiles = await startUpload([data.image]);
                if (uploadedFiles && uploadedFiles[0]) {
                    imageUrl = uploadedFiles[0].url;
                    toast.success("Image uploaded successfully!");
                }
                toast.dismiss();
            } catch (error) {
                console.error("Image upload error:", error);
                toast.error("Failed to upload image. Please try again.");
                return;
            } finally {
                toast.dismiss();
            }
        }
        const ethAmount = parseUnits(data.ethAmount.toString(), 18);
        if (!imageUrl) {
            toast.error("image url is noot found");
            return;
        }


        const tokenParams = {
            userAddress: userAddress, // This will be set by the contract
            name: data.name,
            symbol: data.ticker,
            description: data.description,
            imageUrl: imageUrl,
            twitter: data.twitter || 'non',
            telegram: data.telegram || 'non',
            website: data.website || 'non'
        };



        if (chainId === SEPOLIA_ARBITRUM_CHAIN_ID) {

            createTokenAndAddVote({
                args: [tokenParams],
                value: ethAmount,
            }, {
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
                },
                onError: (error) => {
                    console.error('Contract write error:', error);
                    //set a new error 
                    setErrors([
                        ...errors,
                        {
                            id: new Date().getTime(),
                            name: 'Error Creating Token',
                            error: error,
                        }
                    ]);
                    toast.error('There was an error creating the token. Please try again.');
                }
            });
            toast.dismiss(preparingTokenToast);

        } else {

            ///apply cross chain here later 




        }

    }
    return (

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto p-6">
        <Card className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <Input
                {...form.register("name")}
                placeholder="Token name"
                variant="bordered"
              />
              {form.formState.errors.name && (
                <p className="text-danger text-sm">{form.formState.errors.name.message}</p>
              )}
            </div>
    
            <div>
              <label className="block text-sm font-medium mb-1">Ticker</label>
              <Input
                {...form.register("ticker")}
                placeholder="Token ticker"
                variant="bordered"
              />
              {form.formState.errors.ticker && (
                <p className="text-danger text-sm">{form.formState.errors.ticker.message}</p>
              )}
            </div>
          </div>
    
          <div className="mt-6">
            <label className="block text-sm font-medium mb-1">Description</label>
            <Textarea
              {...form.register("description")}
              placeholder="Token description"
              variant="bordered"
              minRows={3}
            />
          </div>


<div className="w-full">
  <label className="block text-sm font-medium mb-1">Image</label>
  <div className="mt-2">
    {imagePreview ? (
      <Card className="mt-4 w-fit">
        <NextUIImage
          src={imagePreview}
          alt="Preview"
          width={200}
          height={200}
          classNames={{
            wrapper: "rounded-lg",
            img: "object-cover w-[200px] h-[200px]"
          }}
        />
      </Card>
    ) : (
      <div {...getRootProps()} className="w-full">
        <Card
          className={`flex flex-col items-center justify-center h-64 border-2 border-dashed cursor-pointer transition-colors ${
            isDragActive 
              ? "border-primary bg-primary/10" 
              : "border-default-200 bg-default-100"
          } hover:bg-default-200`}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="w-8 h-8 mb-4" />
            <p className="mb-2 text-sm">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-default-500">
              PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
          <input {...getInputProps()} className="hidden" />
        </Card>
      </div>
    )}
  </div>
  {form.formState.errors.image && (
    <p className="text-danger text-sm mt-1">
      {form.formState.errors.image.message}
    </p>
  )}
</div>
          <div className="mt-6">
            <label className="block text-sm font-medium mb-1">ETH Amount to stake</label>
            <Input
              type="number"
              step="0.01"
              {...form.register("ethAmount")}
              variant="bordered"
            />
          </div>
    
          <Button
            variant="flat"
            onPress={() => setShowMoreOptions(!showMoreOptions)}
            className="w-full mt-6"
            endContent={
              <ChevronDown 
                className={`transition-transform duration-200 ${
                  showMoreOptions ? "rotate-180" : ""
                }`}
              />
            }
          >
            {showMoreOptions ? "Hide" : "Show"} More Options
          </Button>
    
          {showMoreOptions && (
            <div className="space-y-6 mt-6">
              <div>
                <label className="block text-sm font-medium mb-1">Twitter Link</label>
                <Input
                  {...form.register("twitter")}
                  placeholder="https://twitter.com/..."
                  variant="bordered"
                />
              </div>
    
              <div>
                <label className="block text-sm font-medium mb-1">Telegram Link</label>
                <Input
                  {...form.register("telegram")}
                  placeholder="https://t.me/..."
                  variant="bordered"
                />
              </div>
    
              <div>
                <label className="block text-sm font-medium mb-1">Website</label>
                <Input
                  {...form.register("website")}
                  placeholder="https://..."
                  variant="bordered"
                />
              </div>
            </div>
          )}
    
          <div className="flex justify-center mt-6">
            <Button
              type="submit"
              color="primary"
              isLoading={isUploading || isWritePending}
              className="w-full max-w-md"
            >
              {isUploading ? "Uploading..." : isWritePending ? "Creating Token..." : "Submit"}
            </Button>
          </div>
        </Card>
      </form>
    )
          }
