package com.datavisualizer.data_visualizer_backend.controllers;

import java.io.IOException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.datavisualizer.data_visualizer_backend.services.UploadService;

@RestController
@RequestMapping("/api/upload")
@CrossOrigin
public class UploadController {

	private UploadService uploadService;
	
	public UploadController(UploadService uploadService) {
		this.uploadService = uploadService;
	}
	
	@PostMapping("/csv")
	public ResponseEntity<?> addFile(@RequestParam MultipartFile file){
		try {
			return ResponseEntity.ok(uploadService.addFile(file));
		} catch (IOException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error Processing File");
		}
	}
}
