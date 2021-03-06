import { Request, Response } from "express";
import { EntityRepository, getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRespository";
import { SurveysRepository } from "../repositories/SurveysRepository";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";
import SendMailService from "../services/SendMailService";


class SendMailController {

    async execute(req: Request, res: Response){
        const { email, survey_id } = req.body

        const usersRepository = getCustomRepository(UsersRepository)
        const surveysRepository = getCustomRepository(SurveysRepository)
        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository)

        const userAlreadyExists = await usersRepository.findOne({email});

        if (!userAlreadyExists) {
            return res.status(400).json({
                erro: "User does not exists!"
            })
        }

        const survey = await surveysRepository.findOne({id:survey_id})

        if(!survey){
            return res.status(400).json({
                error: "Survey does not exists!"
            })
        }

        //salvar as informações na tabela surveyUser
        const surveyUser = surveysUsersRepository.create({
            user_id: userAlreadyExists.id,
            survey_id
        })
        await surveysUsersRepository.save(surveyUser)
        //enviar email para o usuário
        await SendMailService.execute(email, survey.title, survey.description)

        return res.json(surveyUser)
    }
}

export { SendMailController }