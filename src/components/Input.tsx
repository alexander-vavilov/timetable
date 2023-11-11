import { FC, ChangeEvent } from 'react'
import { InputType } from '../types'
import { cn } from '../utils'

const defaultStyles =
	'peer w-full bg-transparent input focus:border-gray-500 disabled:text-white focus:dark:border-neutral-200'

const styles = {
	outline: `${defaultStyles} rounded-md border-2`,
	flushed: `${defaultStyles} border-b-2`,
	time: 'max-w-max rounded-md bg-gray-200 p-1 text-sm dark:bg-neutral-700',
}

const Input: FC<InputType> = ({
	styleVariant = 'outline',
	value,
	placeholder,
	className,
	onChange,
	editable = true,
	...props
}) => {
	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (editable) onChange(e)
	}

	return (
		<div className='relative'>
			<input
				readOnly={!editable}
				disabled={!editable}
				value={value}
				onChange={handleInputChange}
				className={cn(styles[styleVariant], className)}
				{...props}
			/>
			{placeholder && (
				<label
					className={cn(
						'pointer-events-none absolute left-1 -translate-y-1/2 bg-white px-1 capitalize leading-none transition-all duration-200 dark:bg-neutral-800',
						value.length
							? 'top-0 dark:text-neutral-100'
							: 'top-1/2 peer-focus:top-0 dark:text-neutral-300 peer-focus:dark:text-neutral-100'
					)}
				>
					{placeholder}
				</label>
			)}
		</div>
	)
}

export default Input
