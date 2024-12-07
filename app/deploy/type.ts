import { z } from "zod";

export interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

export const formSchema = z.object({
  name: z.string().min(2, { message: "Token name must be at least 2 characters." }),
  ticker: z.string().min(1, { message: "Ticker is required." }).max(10, { message: "Ticker must not exceed 10 characters." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  image: z.any().optional(),
  twitter: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal('')),
  telegram: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal('')),
  website: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal('')),
  ethAmount: z.number()
});

export type FormValues = z.infer<typeof formSchema>;