'use client';
import * as z from 'zod';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useStoreModal } from '@/hooks/use-store-modal';

import { Modal } from '@/components/ui/modal';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import { redirect } from 'next/navigation';

const formShema = z.object({
	name: z.string().min(1),
});

export const StoreModal = () => {
	const storeModal = useStoreModal();
	const [loading, setLoading] = useState(false);

	const form = useForm<z.infer<typeof formShema>>({
		resolver: zodResolver(formShema),
		defaultValues: {
			name: '',
		},
	});

	const onSubmit = async (values: z.infer<typeof formShema>) => {
		try {
			setLoading(true);
			const response = await axios.post('/api/stores', values);
			window.location.assign(`/${response.data.id}`);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			toast.error('Something went wrong.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<Modal
			title="Create a new store"
			description="Add a new store to manage products and orders."
			isOpen={storeModal.isOpen}
			onClose={storeModal.onClose}
		>
			<div>
				<div className=" space-y-4 py-2 pb-4">
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)}>
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input
												placeholder="E-Commerce"
												{...field}
												disabled={loading}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className=" pt-6 space-x-2 flex items-center justify-end">
								<Button
									variant="outline"
									onClick={storeModal.onClose}
									disabled={loading}
								>
									Cancel
								</Button>
								<Button type="submit" disabled={loading}>
									Continue
								</Button>
							</div>
						</form>
					</Form>
				</div>
			</div>
		</Modal>
	);
};
