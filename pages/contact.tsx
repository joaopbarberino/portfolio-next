import { ChangeEvent, useContext, useState } from 'react';
import Layout from '@/components/Layout';
import AppContext from '@/services/AppContext';
import StyledContactContainer from '@/styles/contact';
import { Button, Typography, TextField, Snackbar, Alert, CircularProgress, IconButton } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import data from '@/helpers/data.json';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import SendIcon from '@mui/icons-material/Send';
import DoneIcon from '@mui/icons-material/Done';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import emailjs from '@emailjs/browser';
import PageActionsContainer from '@/components/PageActionsContainer';
import PageChangeButton from '@/components/PageChangeButton';
import StyledButton from '@/components/PageChangeButton/styles';

interface IFormParams {
    name: string;
    subject: string;
    email: string;
    message: string;
};

interface IFormState {
    sending: boolean;
    sent: boolean;
    error: boolean;
}

const LABELS = {
    en: {
        name: 'Name',
        subject: 'Subject',
        email: 'Your email',
        message: 'Message',
        button: 'Send',
        loadingButton: 'Sending'
    },
    ptBr: {
        name: 'Nome',
        subject: 'Assunto',
        email: 'Seu email',
        message: 'Mensagem',
        button: 'Enviar',
        loadingButton: 'Enviando'
    }
};

const SNACK_DATA = {
    en: {
        success: 'Email sent successfully!',
        error: 'Failed to sent email, please try again.'
    },
    ptBr: {
        success: 'Email enviado com sucesso!',
        error: 'Falha ao enviar o email, por favor tente novamente.'
    }
};

const INITIAL_FORM_DATA = {
    name: '',
    subject: '',
    email: '',
    message: ''
};

const INITIAL_FORM_STATE = {
    sending: false,
    sent: false,
    error: false
};

const Contact = () => {
    const { language } = useContext(AppContext);

    const [formData, setFormData] = useState<IFormParams>(INITIAL_FORM_DATA);

    const [formState, setFormState] = useState<IFormState>(INITIAL_FORM_STATE);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log(formData);

        setFormState({
            ...formState,
            sending: true,
        });

        await emailjs.send(
            process.env.NEXT_PUBLIC_EMAILJS_SERVICE as string,
            process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE as string,
            { ...formData },
            process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY as string
        ).then(() => {
            setFormState({
                sending: false,
                sent: true,
                error: false
            });

            setFormData(INITIAL_FORM_DATA);
        }).catch((e) => {
            console.error(e);

            setFormState({
                sending: false,
                sent: true,
                error: true
            });
        });
    };

    const handleFormChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleCloseSnack = () => {
        setFormState(INITIAL_FORM_STATE);
    };

    return (
        <Layout>
            <StyledContactContainer maxWidth='xl'>
                <Typography variant='h1' className='title'><QuestionAnswerIcon /> {data[language].contact.title}</Typography>

                <div className='content'>
                    <Typography dangerouslySetInnerHTML={{ __html: data[language].contact.text[0] }} />

                    <form onSubmit={handleSubmit}>
                        <Grid container className='form' spacing={3} justifyContent={'space-between'}>
                            <Grid xs={12} lg={6}>
                                <TextField
                                    id='name'
                                    name='name'
                                    type='text'
                                    required
                                    variant='outlined'
                                    color='secondary'
                                    fullWidth
                                    label={LABELS[language].name}
                                    value={formData.name}
                                    onChange={handleFormChange}
                                />
                            </Grid>

                            <Grid xs={12} lg={6}>
                                <TextField
                                    id='email'
                                    name='email'
                                    type='email'
                                    required
                                    variant='outlined'
                                    color='secondary'
                                    fullWidth
                                    label={LABELS[language].email}
                                    value={formData.email}
                                    onChange={handleFormChange}
                                />
                            </Grid>

                            <Grid xs={12}>
                                <TextField
                                    id='subject'
                                    name='subject'
                                    type='text'
                                    required
                                    variant='outlined'
                                    color='secondary'
                                    fullWidth
                                    label={LABELS[language].subject}
                                    value={formData.subject}
                                    onChange={handleFormChange}
                                />
                            </Grid>

                            <Grid xs={12}>
                                <TextField
                                    id='message'
                                    name='message'
                                    type='text'
                                    required
                                    variant='outlined'
                                    color='secondary'
                                    fullWidth
                                    multiline
                                    minRows={10}
                                    label={LABELS[language].message}
                                    value={formData.message}
                                    onChange={handleFormChange}
                                />
                            </Grid>

                            <Grid xs={12} display={'flex'} justifyContent={'right'}>
                                <StyledButton
                                    type='submit'
                                    disabled={formState.sending}
                                >
                                    <span>
                                        {formState.sending ? LABELS[language].loadingButton : LABELS[language].button}
                                    </span>

                                    <div className='icon'>
                                        {formState.sending ? < CircularProgress /> : <SendIcon />}
                                    </div>
                                </StyledButton>
                            </Grid>
                        </Grid>

                        <Snackbar
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                            color='secondary'
                            open={formState.sent}
                            key={'vertical + horizontal'}
                            autoHideDuration={3000}
                            onClose={() => handleCloseSnack()}
                        >
                            <Alert
                                onClose={() => handleCloseSnack()}
                                icon={formState.error ? <ReportProblemIcon /> : <DoneIcon />}
                                severity={formState.error ? 'error' : 'success'}
                            >
                                {
                                    formState.error ? SNACK_DATA[language].error : SNACK_DATA[language].success
                                }
                            </Alert>
                        </Snackbar>
                    </form>


                    <div className='socials'>
                        <Typography dangerouslySetInnerHTML={{ __html: data[language].contact.text[1] }} />

                        <div className='icons'>
                            <IconButton href='https://github.com/joaopbarberino' target='_blank'>
                                <GitHubIcon />
                            </IconButton>
                            <IconButton href='https://linkedin.com/in/joao-p-barberino' target='_blank'>
                                <LinkedInIcon />
                            </IconButton>
                        </div>
                    </div>
                </div>

                <PageActionsContainer>
                    <PageChangeButton href={data[language].header[3].link} text={data[language].header[3].text} type='prev' />
                    <PageChangeButton href={data[language].header[0].link} text={data[language].header[0].text} />
                </PageActionsContainer>
            </StyledContactContainer>
        </Layout>
    );
};

export default Contact;