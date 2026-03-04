import time
import os
import json
from google import genai
from google.genai import types
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("GEMINI_API_KEY")

# Só cria o client se existir chave (evita erro no CI)
client = genai.Client(api_key=API_KEY) if API_KEY else None


def generate_suggestions(titulo: str, tipo: str):
    start_time = time.time()

    # 🔹 Se não tiver API key (ex: CI ou testes), retorna mock
    if not client:
        return (
            "Descrição gerada automaticamente para testes.",
            ["teste", "educacional", "api"],
            0.0,
            0,
        )

    system_instruction = """
    Você é um Assistente Pedagógico. Sua função é gerar descrições úteis para alunos e classificar materiais didáticos.
    Retorne APENAS um objeto JSON estrito com o seguinte formato:
    {
        "descricao": "Uma breve descrição engajadora sobre o material",
        "tags": ["tag1", "tag2", "tag3"]
    }
    Retorne apenas 3 tags.
    Não inclua blocos de código markdown ou qualquer outro texto.
    """

    prompt = f"Título do material: {titulo}\nTipo de material: {tipo}"

    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            config=types.GenerateContentConfig(
                system_instruction=system_instruction,
                response_mime_type="application/json",
            ),
            contents=prompt,
        )

        latency = round(time.time() - start_time, 2)

        token_usage = 0
        if response.usage_metadata:
            token_usage = getattr(response.usage_metadata, "total_token_count", 0)

        raw_text = response.text.strip()

        # Remove possíveis blocos markdown
        if raw_text.startswith("```json"):
            raw_text = raw_text.replace("```json", "").replace("```", "").strip()
        elif raw_text.startswith("```"):
            raw_text = raw_text.replace("```", "").strip()

        dados = json.loads(raw_text)
        descricao = dados.get("descricao", "Descrição gerada.")
        tags = dados.get("tags", [])

        return descricao, tags, latency, token_usage

    except Exception as e:
        latency = round(time.time() - start_time, 2)
        return f"Erro na API: {str(e)}", ["erro"], latency, 0
