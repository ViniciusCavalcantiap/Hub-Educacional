from unittest.mock import patch


def test_smart_assist(client):

    with patch("app.routers.smart_assist_router.generate_suggestions") as mock_ai:
        mock_ai.return_value = ("Descrição gerada", ["tag1", "tag2", "tag3"], 1.2, 150)

        response = client.post(
            "/smart-assist/", json={"titulo": "Matemática Financeira", "tipo": "PDF"}
        )

        assert response.status_code == 200
        data = response.json()

        assert data["descricao"] == "Descrição gerada"
        assert len(data["tags"]) == 3
