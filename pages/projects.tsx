import React, { useContext, useState, useEffect } from 'react';
import { isAxiosError } from 'axios';

import data from '@/helpers/data.json';
import AppContext from '@/services/AppContext';
import { getAllRecords } from '@/services/api/record';
import { IRecord } from '@/services/api/record/types';
import { IProject } from '@/types/projects';

import { useWidth } from '@/helpers/hooks';
import { arrayChunk } from '@/helpers';

import { motion, AnimatePresence } from 'framer-motion';
import { Typography, ToggleButtonGroup, ToggleButton, CircularProgress } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Layout from '@/components/Layout';
import StyledProjectsContainer from '@/styles/projects';
import ProjectCard from '@/components/Projects/ProjectCard';
import ProjectDetail from '@/components/Projects/ProjectDetail';
import PageActionsContainer from '@/components/PageActionsContainer';
import PageChangeButton from '@/components/PageChangeButton';

import AccountTreeIcon from '@mui/icons-material/AccountTree';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import WebIcon from '@mui/icons-material/Web';

const PAGE_KEY = 'projects';

enum EProjectTypes {
    GAME = 0,
    WEB = 1
};

interface ILabel {
    [key: string]: {
        en: string,
        ptBr: string
    }
};

const LABELS: ILabel = {
    buttonGroup: {
        en: 'Select project type',
        ptBr: 'Selecione o tipo de projeto'
    },
    gameDevButton: {
        en: 'As a Game Dev',
        ptBr: 'Como Game Dev',
    },
    webDevButton: {
        en: 'As a Web Dev',
        ptBr: 'Como Web Dev',
    }
};

const Projects = () => {
    const { language } = useContext(AppContext);
    const currentBreakpoint = useWidth();

    const [projectType, setProjectType] = useState<EProjectTypes>(0);
    const [projects, setProjects] = useState<IProject[]>([]);
    const [filteredProjects, setFilteredProjects] = useState<IProject[]>([]);
    const [chunkedProjects, setChunkedProjects] = useState<IProject[][]>([]);
    const [selectedProject, setSelectedProject] = useState<IProject>();

    useEffect(() => {
        const loadPage = async () => {
            const response = await getAllRecords(PAGE_KEY);

            if (isAxiosError(response)) {

            } else {
                const newProjects = response.map(record => {
                    const newProject: IProject = {
                        id: record.id,
                        name: record.values[0],
                        link: record.values[1],
                        img: record.values[2],
                        text: record.values[3],
                        type: record.values[4],
                        tech: record.values[5],
                    }

                    return newProject;
                });
                setProjects(newProjects);
            }
        };

        loadPage();
    }, []);

    useEffect(() => {
        const filteredProjects = projects.filter(project => project.type[language] === projectType.toString());
        setFilteredProjects(filteredProjects);
    }, [language, projectType, projects]);

    useEffect(() => {
        setSelectedProject(undefined);
    }, [projectType]);

    useEffect(() => {
        const breakpoints = {
            xs: 1,
            sm: 2,
            md: 3,
            lg: 4,
            xl: 4
        };

        const chunkSize = breakpoints[currentBreakpoint]

        setChunkedProjects(arrayChunk(filteredProjects, chunkSize));
    }, [currentBreakpoint, filteredProjects]);

    const handleProjectType = (event: React.MouseEvent<HTMLElement>, newType: number) => {
        if (newType !== null)
            setProjectType(newType)
    };

    return (
        <Layout>
            <StyledProjectsContainer maxWidth='xl'>
                <Typography variant='h1' className='title'><AccountTreeIcon /> {data[language].projects.title}</Typography>

                <div className='content'>
                    <Typography dangerouslySetInnerHTML={{ __html: data[language].projects.text }} />

                    <ToggleButtonGroup
                        value={projectType}
                        exclusive
                        onChange={handleProjectType}
                        aria-label={LABELS['buttonGroup'][language]}
                        size='large'
                    >
                        <ToggleButton value={EProjectTypes.GAME} aria-label={LABELS['gameDevButton'][language]} color='secondary'>
                            <SportsEsportsIcon /> {LABELS['gameDevButton'][language]}
                        </ToggleButton>
                        <ToggleButton value={EProjectTypes.WEB} aria-label={LABELS['webDevButton'][language]} color='secondary'>
                            <WebIcon /> {LABELS['webDevButton'][language]}
                        </ToggleButton>
                    </ToggleButtonGroup>

                    <Grid container columnSpacing={2} rowSpacing={4} className='projects-container'>
                        {
                            chunkedProjects.length === 0 &&
                            <Grid xs={12}>
                                <CircularProgress color='secondary' sx={{ mx: 'auto', display: 'flex' }} />
                            </Grid>
                        }
                        {
                            chunkedProjects.map((projects, index) => {
                                const projectsRow = projects.map(project =>
                                    <Grid xs={12} sm={6} md={4} lg={3} key={project.id}>
                                        <ProjectCard
                                            project={project}
                                            setSelectedProject={(project) => setSelectedProject(project)}
                                            isSelected={selectedProject === project}
                                        />
                                    </Grid>
                                );

                                const showDetail = projects.some(p => p.id === selectedProject?.id);

                                return (
                                    <React.Fragment key={index}>
                                        {projectsRow}
                                        {
                                            <Grid xs={12} className='project-detail-container'>
                                                <AnimatePresence >
                                                    {
                                                        selectedProject && showDetail &&
                                                        <motion.div
                                                            key='selected-project'
                                                            initial={{ opacity: 0, height: 0 }}
                                                            animate={{ opacity: 1, height: 'auto' }}
                                                            exit={{ opacity: 0, height: 0 }}
                                                            transition={{ ease: 'anticipate', duration: .5 }}

                                                        >
                                                            <ProjectDetail
                                                                project={selectedProject}
                                                                onClose={() => setSelectedProject(undefined)}
                                                            />
                                                        </motion.div>
                                                    }

                                                </AnimatePresence>
                                            </Grid>

                                        }
                                    </React.Fragment>
                                )
                            }
                            )
                        }
                    </Grid>

                    <PageActionsContainer>
                        <PageChangeButton href={data[language].header[2].link} text={data[language].header[2].text} type='prev' />
                        <PageChangeButton href={data[language].header[4].link} text={data[language].header[4].text} />
                    </PageActionsContainer>
                </div>
            </StyledProjectsContainer>
        </Layout >
    )
};

export default Projects;