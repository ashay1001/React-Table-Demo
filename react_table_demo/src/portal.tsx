import React from "react";
import { createPortal } from "react-dom"


export function Portal (children: any) {
    return createPortal(children, document.body);
}