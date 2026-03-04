def test_create_resource(client):
    response = client.post(
        "/resources/",
        json={
            "titulo": "Teste",
            "descricao": "Descrição teste",
            "tipo": "PDF",
            "url": "http://teste.com",
            "tags": "tag1, tag2",
        },
    )

    assert response.status_code == 201
    data = response.json()
    assert data["titulo"] == "Teste"
    assert data["id"] is not None


def test_list_resources(client):
    client.post(
        "/resources/",
        json={
            "titulo": "Item 1",
            "descricao": "Desc",
            "tipo": "PDF",
            "url": "http://teste.com",
            "tags": "tag1",
        },
    )

    response = client.get("/resources/")
    assert response.status_code == 200
    assert len(response.json()) == 1


def test_update_resource(client):
    create = client.post(
        "/resources/",
        json={
            "titulo": "Antigo",
            "descricao": "Desc",
            "tipo": "PDF",
            "url": "http://teste.com",
            "tags": "tag1",
        },
    )

    resource_id = create.json()["id"]

    update = client.put(
        f"/resources/{resource_id}",
        json={
            "titulo": "Novo",
            "descricao": "Atualizado",
            "tipo": "PDF",
            "url": "http://novo.com",
            "tags": "tag2",
        },
    )

    assert update.status_code == 200
    assert update.json()["titulo"] == "Novo"


def test_delete_resource(client):
    create = client.post(
        "/resources/",
        json={
            "titulo": "Delete",
            "descricao": "Desc",
            "tipo": "PDF",
            "url": "http://teste.com",
            "tags": "tag1",
        },
    )

    resource_id = create.json()["id"]

    delete = client.delete(f"/resources/{resource_id}")
    assert delete.status_code == 200

    get = client.get(f"/resources/{resource_id}")
    assert get.status_code == 404
