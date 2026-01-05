.admin-page {
  padding: 20px 0;
}

.admin-container {
  display: grid;
  gap: 40px;
}

.admin-form-section,
.products-list-section {
  background: white;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.admin-form-section h2,
.products-list-section h2 {
  margin-bottom: 25px;
  color: #2c3e50;
  font-size: 1.8rem;
  padding-bottom: 15px;
  border-bottom: 2px solid #f8f9fa;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.form-group {
  margin-bottom: 25px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #34495e;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  transition: border 0.3s;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  border-color: #3498db;
  outline: none;
}

.form-actions {
  display: flex;
  gap: 15px;
  margin-top: 30px;
}

.btn-secondary {
  background: #95a5a6;
  color: white;
}

.btn-secondary:hover {
  background: #7f8c8d;
}

.demo-section {
  margin-top: 30px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 10px;
  border-left: 4px solid #2ecc71;
}

.demo-section h3 {
  margin-bottom: 10px;
  color: #2c3e50;
}

.demo-section p {
  margin-bottom: 15px;
  color: #7f8c8d;
}

.no-products {
  text-align: center;
  padding: 40px;
  color: #7f8c8d;
}

.no-products i {
  font-size: 3rem;
  margin-bottom: 15px;
}

.products-table-container {
  overflow-x: auto;
}

.products-table {
  width: 100%;
  border-collapse: collapse;
}

.products-table th {
  background: #f8f9fa;
  padding: 15px;
  text-align: left;
  color: #2c3e50;
  font-weight: bold;
  border-bottom: 2px solid #e9ecef;
}

.products-table td {
  padding: 15px;
  border-bottom: 1px solid #e9ecef;
  vertical-align: middle;
}

.product-thumb {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 5px;
}

.no-thumb {
  width: 50px;
  height: 50px;
  background: #f8f9fa;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #bdc3c7;
}

.product-desc {
  color: #7f8c8d;
  font-size: 0.9rem;
  margin-top: 5px;
}

.action-buttons {
  display: flex;
  gap: 10px;
}

.btn-edit,
.btn-delete {
  width: 35px;
  height: 35px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
}

.btn-edit {
  background: #3498db;
  color: white;
}

.btn-edit:hover {
  background: #2980b9;
}

.btn-delete {
  background: #e74c3c;
  color: white;
}

.btn-delete:hover {
  background: #c0392b;
}

.loading {
  text-align: center;
  padding: 40px;
  color: #7f8c8d;
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .admin-form-section,
  .products-list-section {
    padding: 20px;
  }
  
  .products-table th,
  .products-table td {
    padding: 10px;
    font-size: 0.9rem;
  }
  
  .action-buttons {
    flex-direction: column;
  }
  
  .form-actions {
    flex-direction: column;
  }
  
  .form-actions .btn {
    width: 100%;
  }
}
