import { Box, Button, Container, Paper, TextareaAutosize, TextField, Typography } from "@mui/material";

const Contact = () => {
    return (
        <Container>
            <Box display="flex" flexDirection="column" alignItems="center" pt="2rem" gap="2rem">
                <Typography variant="h2">Contact</Typography>
                <Paper elevation={16}>
                    <Box p={"2rem"} display="flex" flexDirection={"column"}>
                        <Typography>Email Address</Typography>
                        <TextField variant="outlined" size="small"></TextField>
                        
                        <Typography sx={{mt: "2rem"}}>Message</Typography>
                        <TextareaAutosize variant="outlined" size="large"></TextareaAutosize>

                        <Button variant={"contained"} sx={{mt: "2rem"}}>Submit</Button>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
}

export default Contact;