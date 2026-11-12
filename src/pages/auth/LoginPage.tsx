import { useState } from "react";
import { useForm } from "react-hook-form";
import type { LoginData } from "../../types/auth.types";
import { useNavigate } from "react-router-dom";
import { loginRequest } from "../../services/authService";

interface LoginFormData {
    email: string;
    password: string;
}

export function LoginPage(){
    const[serverError, setServerError] = useState("");
    const navigate = useNavigate();
    const{
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormData>();


    async function handleLogin(data: LoginData){
        try{
            setServerError("");
            await loginRequest(data);
            navigate("/app/dashboard");
        } catch(error){
            setServerError("Erro login");
            console.log("Erro handleLogin", error);
        }
    }
    return(
        <main className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
            <section className="w-full max-w-md roundesd-2x1 bg-white p-8 shadow-lg">
                <h1 className="mb-2 text-center text-2x1 font-bold text-gray-800"> 
                    Restaurante
                </h1>
                <p className="mb-6 text-center text-sm text-gray-500">
                    Acesse o painel do sistema
                </p>
                <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700 ">
                            E-mail
                        </label>
                        <input type="email"
                               className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500" 
                               placeholder="admin@email.com"
                               {...register("email", {
                                required: "O e-email é obrigatório",
                               })}
                        />
                        {errors.email && (
                            <p className="m-1- text-sm text-red-600">
                                {errors.email.message}
                            </p>

                        )}
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700 ">
                            senha
                        </label>
                        <input type="password"
                               className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500" 
                               placeholder="Digite sua senha"
                               {...register("password", {
                                required: "A senha é obrigatório",
                               })}
                        />
                        {errors.password && (
                            <p className="m-1- text-sm text-red-600">
                                {errors.password.message}
                            </p>

                        )}
                    </div>

                    {serverError && (
                        <p className="rouded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                            {serverError}
                        </p>
                    )}

                    <button
                    type= "submit"
                    disabled={isSubmitting}
                    className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition "
                    >
                        {isSubmitting ? "Entrando..." : "Entrar" } 
                    </button>
                    
                </form>

            </section>

        </main>
    );
}