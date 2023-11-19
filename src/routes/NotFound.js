import { Alert } from "react-bootstrap";

const NotFound = () => {
    return (
        <>
            <Alert variant="danger" dismissible className='mt-3'>
                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                <p>
                    You don't have permission to access this domain!
                </p>
            </Alert>
        </>
    )
}
export default NotFound;