import { Alert, AlertDescription, AlertTitle } from './ui/alert'
import { AlertCircleIcon } from 'lucide-react'
import { type FC } from 'react'

type ErrorAlertProps = {
    title: string;
    description: string;
}

export const ErrorAlert: FC<ErrorAlertProps> = ({ title, description }) => {
    return (
        <Alert variant="destructive">
            <AlertCircleIcon />
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription>
                <p>{description}</p>
            </AlertDescription>
        </Alert>
    )
}
