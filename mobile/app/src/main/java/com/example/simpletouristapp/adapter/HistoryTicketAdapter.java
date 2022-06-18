package com.example.simpletouristapp.adapter;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.navigation.Navigation;
import androidx.recyclerview.widget.RecyclerView;

import com.example.simpletouristapp.PayPalActivity;
import com.example.simpletouristapp.R;
import com.example.simpletouristapp.model.HistoryTicketResponse;
import com.example.simpletouristapp.service.ToursApiService;
import com.squareup.picasso.Picasso;

import java.io.Serializable;
import java.text.NumberFormat;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Locale;

public class HistoryTicketAdapter extends RecyclerView.Adapter<HistoryTicketAdapter.HistoryTicketViewHolder>{
    private Context context;
    private List<HistoryTicketResponse.Ticket> tickets;

    public HistoryTicketAdapter(Context context, List<HistoryTicketResponse.Ticket> tickets) {
        this.context = context;
        this.tickets = tickets;
    }

    @NonNull
    @Override
    public HistoryTicketViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        LayoutInflater inflater = LayoutInflater.from(parent.getContext());
        View view = inflater.inflate(R.layout.item_history, parent, false);
        return new HistoryTicketViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull HistoryTicketViewHolder holder, int position) {
        HistoryTicketResponse.Ticket ticket = tickets.get(position);

        Locale lc = new Locale("nv","VN");
        NumberFormat nf = NumberFormat.getCurrencyInstance(lc);

        String pattern = "dd/MM/yyyy";
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);

        holder.nameTour.setText(ticket.getTourName());
        holder.price.setText(nf.format(ticket.getPaymentPrice()));
        if(ticket.getStatus() == 1){
            holder.btnRate.setVisibility(View.VISIBLE);
            holder.btnPayment.setVisibility(View.GONE);
            holder.state.setText("Đã thanh toán");
        }else {
            holder.btnRate.setVisibility(View.GONE);
            holder.btnPayment.setVisibility(View.VISIBLE);
            holder.state.setText("Chưa thanh toán");
        }
        holder.itemView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Bundle bundle = new Bundle();
                bundle.putSerializable("ticket", (Serializable) ticket);
                Navigation.findNavController(view).navigate(R.id.action_nav_history_to_nav_history_detail,bundle);
            }
        });
        holder.bookingDate.setText(simpleDateFormat.format(ticket.getBookingDate()));
        try {
            Picasso.get().load(ToursApiService.BASE_URL + ticket.getImageAvatar().substring(7)).into(holder.image);
        }catch (Exception e){
            Log.d("error",e.getMessage());
        }
        holder.btnRate.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Bundle bundle = new Bundle();
                bundle.putSerializable("IdTour", ticket.getIdTour());
                Navigation.findNavController(view).navigate(R.id.action_nav_history_to_nav_detail_tour,bundle);
            }
        });
        holder.btnPayment.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(context, PayPalActivity.class);
                intent.putExtra("ticket",ticket);
                context.startActivity(intent);
            }
        });
    }

    @Override
    public int getItemCount() {
        return tickets.size();
    }

    public class HistoryTicketViewHolder extends RecyclerView.ViewHolder{
        private ImageView image;
        private TextView nameTour;
        private TextView price;
        private TextView bookingDate;
        private Button btnRate;
        private Button btnPayment;
        private TextView state;
        public HistoryTicketViewHolder(@NonNull View itemView) {
            super(itemView);
            nameTour = itemView.findViewById(R.id.tv_name_tour_history);
            price = itemView.findViewById(R.id.tv_price_history);
            btnRate = itemView.findViewById(R.id.btn_rate_history);
            state = itemView.findViewById(R.id.tv_state);
            image = itemView.findViewById(R.id.image_history);
            bookingDate = itemView.findViewById(R.id.tv_booking_date);
            btnPayment = itemView.findViewById(R.id.btn_payment);
        }
    }
}
