import { Box, Button, Container, Paper, TextareaAutosize, TextField, Typography } from "@mui/material";

const Contact = () => {
    return (
        <Container sx={{bgcolor: "white", height: "100vh", width: "100vw"}}>
            <Box display="flex" flexDirection="column" alignItems="center" pt="2rem" gap="2rem">
                <Typography variant="h3" color="black">Contact</Typography>
                <Paper elevation={16}>
                    <Box p={"2rem"} display="flex" flexDirection={"column"} sx={{minWidth: "300px"}}>
                        <Typography>Email Address</Typography>
                        <TextField variant="outlined" size="small"></TextField>
                        
                        <Typography sx={{mt: "2rem"}}>Message</Typography>
                        <TextField multiline minRows={4} variant="outlined"></TextField>

                        <Button variant={"contained"} sx={{mt: "2rem"}}>Submit</Button>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
}

export default Contact;