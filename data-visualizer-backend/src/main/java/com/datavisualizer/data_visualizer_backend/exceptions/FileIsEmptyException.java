package com.datavisualizer.data_visualizer_backend.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class FileIsEmptyException extends RuntimeException{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -6941993878501063849L;

	public FileIsEmptyException(String message) {
		super(message);
	}
}
