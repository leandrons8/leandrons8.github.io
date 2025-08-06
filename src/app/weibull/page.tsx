'use client'

// Weibull Distribution

import { Button, CloseButton, Col, Container, FormControl, InputGroup, Row } from "react-bootstrap";
import { useState } from "react";
import { gamma } from "mathjs";
import React from 'react';
import dynamic from "next/dynamic";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false, })

export default function Home() {
  const [mttf, setMttf] = useState(1)
  const [betas, setBetas] = useState([1])
  const etas = betas.map(beta => mttf/gamma(1/beta+1))

  const steps = 100
  const stop = mttf*3
  const step = stop/steps

  const t = [...Array(steps+1).keys().map(i => i*step)]

  const data = []
  for (const [i, beta] of betas.entries()){
    const eta = etas[i]
    const customdata = []
    const f = []
    for (const t_ of t){
      const r = Math.exp(-1*(t_/eta)**beta)
      f.push(beta/eta*(t_/eta)**(beta-1)*r)
      customdata.push([r, 1-r])
    }
    data.push({
      x: t,
      y: f,
      customdata: customdata,
      hovertemplate: "%{y:.2} | <span style='color: #00D000'>R: %{customdata[0]:.2%}</span> | <span style='color: #D00000'>F: %{customdata[1]:.2%}</span>",
      name: `PDF ${i+1}`,
      // type: "line"
    })
  }

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs="auto">
          <Plot
            data={data}
            layout={{
              hovermode: 'x unified',
              shapes: [{
                label: {
                  text: "MTTF",
                  textposition: "middle"
                },
                line: {
                  color: "red",
                  dash: "dash"
                },
                type: "line",
                x0: mttf,
                x1: mttf,
                xref: "x",
                y0: 0,
                y1: 1,
                yref: "y domain"
              }]
            }}
          />
        </Col>
      </Row>
      <Row className="align-items-end g-3">
        <Col xs="3">
          <InputGroup className="py-1">
            <InputGroup.Text>MTTF</InputGroup.Text>
            <FormControl
              type="number"
              min={0.1}
              step={0.1}
              value={mttf}
              required
              onChange={e => setMttf(Number(e.target.value))}
            />
          </InputGroup>
          <div className="d-grid gap-1">
            <Button
              className="bi bi-plus-lg"
              onClick={() => setBetas([...betas, 1])}
            />
          </div>
        </Col>

        {betas.map((beta, i) =>
          <Col xs="3" key={i}>
            <Row>
              <Col>
                <h6>PDF {i+1}</h6>
              </Col>
              <Col xs="auto">
                <CloseButton onClick={() => setBetas(
                  betas.filter((beta, j) => i != j)
                )}/>
              </Col>
            </Row>
            <InputGroup className="py-1">
              <InputGroup.Text>β</InputGroup.Text>
              <FormControl
                type="number"
                required
                min={0.1}
                step={0.1}
                value={beta}
                onChange={e => setBetas(betas.map(
                  (beta, j) => (i==j) ? Number(e.target.value) : beta
                ))}
              />
            </InputGroup>
            <InputGroup>
              <InputGroup.Text>η</InputGroup.Text>
              <FormControl
                type="number"
                value={etas[i]}
                disabled
                readOnly={true}
              />
            </InputGroup>
          </Col>
        )}

      </Row>
    </Container>
  );
}
