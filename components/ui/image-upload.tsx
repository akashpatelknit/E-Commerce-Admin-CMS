'use client';

import { useEffect, useState } from 'react';
import { Button } from './button';
import { ImagePlus, Trash } from 'lucide-react';
import Image from 'next/image';
import { CldUploadWidget } from 'next-cloudinary';

interface ImageUploadProps {
	disabled?: boolean;
	onChange: (value: string) => void;
	onRemove: (value: string) => void;
	value: string[];
}
const ImageUpload: React.FC<ImageUploadProps> = ({
	disabled,
	onChange,
	onRemove,
	value,
}) => {
	const [mounted, setMounted] = useState(false);
	console.log('value', value);
	useEffect(() => {
		setMounted(true);
	}, []);

	const onUpload = async (result: any) => {
		console.log(result.info.secure_url);
		onChange(result.info.secure_url);
	};

	if (!mounted) {
		return null;
	}
	return (
		<div>
			<div className=" mb-4 flex items-center gap-4">
				{value.map((url) => (
					<div
						key={url}
						className=" relative w-[200px] h-[200px] rounded-md overflow-hidden"
					>
						<div className=" z-10 absolute top-2 right-2">
							<Button
								type="button"
								onClick={() => onRemove(url)}
								variant="destructive"
								size="icon"
							>
								<Trash className=" w-4 h-4" />
							</Button>
						</div>
						<Image
							fill
							className=" object-cover"
							alt="Image"
							src={url}
						/>
					</div>
				))}
			</div>
			<CldUploadWidget onUpload={onUpload} uploadPreset="ml_default">
				{({ open }) => {
					const onClick = () => {
						if (disabled) return;
						open();
					};
					return (
						<Button
							onClick={onClick}
							disabled={disabled}
							variant="secondary"
							type="button"
						>
							<ImagePlus className=" w-4 h-4 mr-2" />
							Upload an Image
						</Button>
					);
				}}
			</CldUploadWidget>
		</div>
	);
};

export default ImageUpload;
