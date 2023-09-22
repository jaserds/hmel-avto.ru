import db from "../db.js"
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import tokenService from "../service/tokenService.js";
import mailService from "../service/mailService.js";
import { ApiError } from "../exceptions/api-error.js";




class UserController{

    async registration(req, res, next){
        try{
            const { fio, phone, email, password, role } = req.body;
                // Проверка наличия пользователя в базе данных
            const [isUser, metadataUser] = await db.query(`SELECT * FROM users WHERE email = '${email}'`)
	    let phone_clear = phone.replace(/\D/g, '');
        
            if((isUser.length > 0)) {
                return next(ApiError.BadRequest('* Пользователь с такой почтой уже существует '));
            } else {
            // Создание нового пользователя
            const saltRounds = 5;
            bcrypt.hash(password, saltRounds, async (err, hash) => {
                if (err) {
                    console.error('Ошибка при хэшировании пароля: ', err);
                    // Обработка ошибки
                } else {
                    // Сохранение usera в базе данных
                    const activationLink = uuidv4();
                    const [newuser, metadataNewUser] = await db.query(`INSERT INTO users (fio, email, phone, password, activatedLink, Role) VALUES ('${fio}', '${email}', '${phone_clear}', '${hash}', '${activationLink}', '${role}')`);
                    await mailService.sendActivationMail(email, `http://localhost:4444/user/activate/${activationLink}`);
                    const userDto = {fio: fio, email: email, id: newuser, role: role};
                    const tokens = tokenService.generateTokens(userDto);
                    await tokenService.saveToken(newuser, tokens.refreshToken);
                    const userData = {...tokens, userDto};
                    res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
                    res.status(200).json({userData: userData, message: '* Пользователь успешно создан' });
                    };
                });
            }
        } catch (e) {
            next(e);
        }

    }
    
    async registrationManager(req, res, next){
        try{
            const { fio, phone, email, password, inn, organizationName, jobeTitle, role } = req.body;
                // Проверка наличия пользователя в базе данных
            const [isUser, metadataUser] = await db.query(`SELECT * FROM users WHERE email = '${email}'`)
	    let phone_clear = phone.replace(/\D/g, '');
        
            if((isUser.length > 0)) {
                return next(ApiError.BadRequest('* Пользователь с такой почтой уже существует '));
            } else {
            // Создание нового пользователя
            const saltRounds = 5;
            bcrypt.hash(password, saltRounds, async (err, hash) => {
                if (err) {
                    console.error('Ошибка при хэшировании пароля: ', err);
                    // Обработка ошибки
                } else {
                    // Сохранение usera в базе данных
                    const activationLink = uuidv4();
                    const [newuser, metadataNewUser] = await db.query(`
                    INSERT INTO users (fio, email, phone, password, inn, OrganizationName, JobTitle, activatedLink, Role) VALUES (
                        '${fio}', '${email}', '${phone_clear}', '${hash}', '${inn}', '${organizationName}', '${jobeTitle}', '${activationLink}', '${role}')`);
                    await mailService.sendActivationMail(email, `http://localhost:4444/user/activate/${activationLink}`);
                    const userDto = {fio: fio, email: email, id: newuser, role: role};
                    const tokens = tokenService.generateTokens(userDto);
                    await tokenService.saveToken(newuser, tokens.refreshToken);
                    const userData = {...tokens, userDto};
                    res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
                    res.status(200).json({userData: userData, message: '* Пользователь успешно создан' });
                    };
                });
            }
        } catch (e) {
            next(e);
        }

    }

    async login(req, res, next){
        try{
            const {email, password } = req.body;
            const [user, metadata] = await db.query(`SELECT * FROM users WHERE email = '${email}'`);
            if (user.length === 0){
                return next(ApiError.BadRequest('Пользователь с таким email не найден'));
            }

            const isPassEquals = await bcrypt.compare(password, user[0]['password'])
            if (!isPassEquals) {
                return next(ApiError.BadRequest('* Неверное имя потльзователя или пароль'))
            }else{
                if (user[0]['Role'] !== 'Manager'){
                    const userDto = {fio: user[0]['fio'], email: email, id: user[0]['id'], role: user[0]['Role']}
                    const tokens = tokenService.generateTokens(userDto)
                    await tokenService.saveToken(user[0]['id'], tokens.refreshToken)
                    const userData = {...tokens, userDto}
                    res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
                    res.status(200).json({userData: userData, message: '* Вы успешно авторизировались' });
                } else {
                    return next(ApiError.BadRequest('* Перейдите во вкладку авторизации для менеджеров'))
                }
            }
        } catch (e) {
            next(e);
        }
    }

    async loginManager(req, res, next){
        try{
            const {email, password, role } = req.body;
            const [user, metadata] = await db.query(`SELECT * FROM users WHERE email = '${email}' AND Role = '${role}'`);
            if (user.length === 0){
                return next(ApiError.BadRequest('Менеджер с таким Email не найден'));
            }

            const isPassEquals = await bcrypt.compare(password, user[0]['password'])
            if (!isPassEquals) {
                return next(ApiError.BadRequest('* Неверное имя потльзователя или пароль'))
            }else{
                const userDto = {fio: user[0]['fio'], email: email, id: user[0]['id'], role: user[0]['Role']}
                const tokens = tokenService.generateTokens(userDto)
                await tokenService.saveToken(user[0]['id'], tokens.refreshToken)
                const userData = {...tokens, userDto}
                res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
                res.status(200).json({userData: userData, message: '* Вы успешно авторизировались' });
            }
        } catch (e) {
            next(e);
        }
    }

    async logout(req, res, next){
        try{
            const {refreshToken} = req.cookies;
            const token = await tokenService.removeToken(refreshToken)
            res.clearCookie('refreshToken')
            return res.json(token)
        } catch (e) {
            next(e);
        }

    }

    async activate(req, res, next){
        try{
            const activationLink = req.params.link;
            const [userData, meta] = await db.query(`SELECT id, activatedLink FROM users WHERE activatedLink = '${activationLink}'`);
            if (userData.length === 0){
                return next(ApiError.BadRequest('Не корректная ссылка активации'))
            }

            await db.query(`UPDATE users SET isActivated = '1' WHERE (id = '${userData[0]['id']}')`);
            res.redirect('/')
        } catch (e) {
            next(e);
        }

    }

    async refresh(req, res, next){
        try{
            const {refreshToken} = req.cookies;
            if (!refreshToken){
                return next(ApiError.UnauthorizedError());
            }

            let userData = tokenService.validateRefreshToken(refreshToken)
            const tokenFromDB = await tokenService.findToken(refreshToken)
            
            if (!userData || !tokenFromDB){
                return next(ApiError.UnauthorizedError())
            }

            const [userFromDB, msodss] = await db.query(`SELECT fio, email, id, Role FROM users WHERE id = '${tokenFromDB[0]['userID']}'`)
            const userDto = {fio: userFromDB[0]['fio'], email: userFromDB[0]['email'], id: userFromDB[0]['id'], role: userFromDB[0]['Role']}
            const tokens = tokenService.generateTokens(userDto)
            await tokenService.saveToken(userDto['id'], tokens.refreshToken)
            userData = {...tokens, userDto}

            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            res.status(200).json(userData);
        } catch (e) {
            next(e);
        }

    }

}


export default new UserController();