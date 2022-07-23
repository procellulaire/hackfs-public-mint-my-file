import Moralis from "moralis";
import React, { useState, useEffect } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { useWeb3Transfer, useMoralis } from "react-moralis";

export default function TransferNFT(props) {
  const [connectorId, setConnectorId] = useState("injected");
  const { enableWeb3 } = useMoralis();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [form, setForm] = useState({});
  const [tx, setTx] = useState({});

  const { fetch, error, isFetching } = useWeb3Transfer({
    receiver: form.receiver,
    contractAddress: props.nft.contract_address,
    tokenId: props.nft.token_id,
    type: "erc721",
    chainId:"0x89"
  });

  const handleOnChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  //   const transfer = async() =>{
  //     console.log("receiver",form.receiver)
  //     console.log("info",props.nft)
  //     const options ={
  //         type: "erc721",
  //         receiver: form.receiver,
  //         contractAddress: props.nft.contract_address,
  //         tokenId: props.nft.token_id,
  //         chain:"polygon"
  //     }
  //     const result = await Moralis.transfer(options)
  //     //fetch();

  //   }

  return (
    <div>
      {/* <button onClick={() => fetch()} disabled={isFetching}>
        Transfer
      </button> */}

      <Button variant="dark" onClick={handleShow}>
        Send
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Send your NFT</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <p>{error.message}</p>}
          {tx.hash && <p>Transaction success! <br/> <a href={`https://polygonscan.com/tx/${tx.hash}`} target="_blank">View on polygonScan</a></p>}
          <Form>
            <Form.Group className="mb-3" controlId="receiver">
              <Form.Label>Receiver</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter reciever addres. eg. 0x..."
                onChange={handleOnChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => fetch({
                onSuccess: (tx) => {
                  console.log("transaction", tx.hash)
                setTx(tx)
                },
              })}
            disabled={isFetching}
          >
            Transfer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
