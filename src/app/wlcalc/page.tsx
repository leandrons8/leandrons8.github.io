'use client'

import { Button, CloseButton, Col, Container, FormCheck, FormSelect, Row, Table } from "react-bootstrap";
import RootLayout from "./layout";
import { useState } from "react";

type Anilha = {
  cor: string,
  padrao: string,
  kgs: number,
  lbs: number,
  kgsStr: string,
  lbsStr: string
}

const cores = [
  {cor: "Pretas", class: "dark"},
  {cor: "Verdes", class: "success"},
  {cor: "Amarelas", class: "warning"},
  {cor: "Azuis", class: "primary"},
  {cor: "Vermelhas", class: "danger"}
]

export default function Home() {
  const [barraMasc, setBarraMasc] = useState(true)
  const [barraKgs, setBarraKgs] = useState(true)
  const [anilhaKgs, setAnilhaKgs] = useState(true)
  const [anilhaCor, setAnilhaCor] = useState(0)
  const [anilhas, setAnilhas] = useState<Anilha[]>([])

  function addAnilhas(){
    let padrao: string
    let kgs: number
    let lbs: number
    if (anilhaKgs){
      padrao = "Kgs"
      kgs = 5*(anilhaCor+1)
      lbs = kgs*2.2046
    } else {
      padrao = "Lbs"
      lbs = 10*(anilhaCor+1) + 5
      kgs = lbs/2.2046
    }
    setAnilhas([...anilhas, {
      cor: cores[anilhaCor].cor,
      padrao: padrao,
      kgs: kgs,
      lbs: lbs,
      kgsStr: String(Math.round(kgs)),
      lbsStr: String(Math.round(lbs))
    }])
  }

  function calcSoma(){
    let kgs: number
    let lbs: number
    if (barraKgs && barraMasc){
      kgs = 20
      lbs = kgs*2.2046
    } else if (barraKgs && !barraMasc){
      kgs = 15
      lbs = kgs*2.2046
    } else if (!barraKgs && barraMasc){
      lbs = 45
      kgs = lbs/2.2046
    } else {
      lbs = 35
      kgs = lbs/2.2046
    }
    for (const an of anilhas){
      kgs += 2*an.kgs
      lbs += 2*an.lbs
    }
    const kgsStr = String(Math.round(kgs))
    const lbsStr = String(Math.round(lbs))
    return `Peso total da barra: ${kgsStr} kgs | ${lbsStr} lbs`
  }

  return (
    <Container>
      <p className="fs-4">{calcSoma()}</p>
      <p className="fs-5">Barra olímpica</p>
      <Row>
        <Col xs="auto">
          <FormCheck 
            type="radio"
            name="barraSexo"
            onClick={() => setBarraMasc(true)}
            label=""
            className="bi bi-gender-male"
            defaultChecked
          />
          <FormCheck
            type="radio"
            name="barraSexo"
            onClick={() => setBarraMasc(false)}
            label=""
            className="bi bi-gender-female"
          />
        </Col>
        <Col xs="auto">
          <FormCheck
            type="radio"
            name="barraPadrao"
            id="barraKgs"
            onClick={() => setBarraKgs(true)}
            label="Kgs"
            defaultChecked
          />
          <FormCheck
            type="radio"
            name="barraPadrao"
            id="barraLbs"
            onClick={() => setBarraKgs(false)}
            label="Lbs"
          />
        </Col>
      </Row>
      <p className="fs-5">Pares de anilhas</p>
      <Row className="align-items-center">
        <Col xs="auto">
          <FormSelect onChange={(e) => setAnilhaCor(Number(e.target.value))}>
            {cores.map((an, i) =>
              <option key={i} value={i} className={`text-bg-${an.class}`}>
                {an.cor}
              </option>
            )}
          </FormSelect>
        </Col>
        <Col xs="auto">
          <FormCheck
            type="radio"
            name="anilhaPadrao"
            id="anilhaKgs"
            onClick={() => setAnilhaKgs(true)}
            label="Kgs"
            defaultChecked
          />
          <FormCheck
            type="radio"
            name="anilhaPadrao"
            id="anilhaLbs"
            onClick={() => setAnilhaKgs(false)}
            label="Lbs"
          />
        </Col>
        <Col xs="auto">
          <Button
            className="bi bi-plus-lg"
            onClick={addAnilhas}
          />
        </Col>
      </Row>
      <Row>
        <Col xs="auto">
          <Table striped hover>
            <thead>
              <tr>
                <th>Cor</th>
                <th>Padrão</th>
                <th>Kgs</th>
                <th>Lbs</th>
                <th>Remover</th>
              </tr>
            </thead>
            <tbody>
              {anilhas.map(
                (an, i) => <tr key={i}>
                  <td>{an.cor}</td>
                  <td>{an.padrao}</td>
                  <td>{an.kgsStr}</td>
                  <td>{an.lbsStr}</td>
                  <td><CloseButton onClick={() => setAnilhas(
                    anilhas.filter((a, j) => i != j))
                  }/></td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}
