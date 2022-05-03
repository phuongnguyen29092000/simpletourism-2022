package com.example.simpletouristapp.adapter;

import android.content.Context;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.simpletouristapp.R;
import com.example.simpletouristapp.model.Tour;
import com.squareup.picasso.Picasso;

import java.util.List;

public class TourAdapter extends RecyclerView.Adapter<TourAdapter.TourViewHolder> {

    private Context context;
    private List<Tour> tours;

    public TourAdapter(Context context, List<Tour> tours) {
        this.context = context;
        this.tours = tours;
    }

    @NonNull
    @Override
    public TourViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        LayoutInflater inflater = LayoutInflater.from(parent.getContext());
        View view = inflater.inflate(R.layout.item_tour, parent, false);
        return new TourViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull TourViewHolder holder, int position) {
        Tour tour = tours.get(position);
        try {
            Picasso.get().load("http://192.168.1.12:4000/" + tour.getImageAvatar().substring(7)).into(holder.imageTour);

        }catch (Exception e){
            Log.d("error",e.getMessage());
        }
        holder.nameTour.setText(tour.getNameTour());
        holder.price.setText(Integer.toString(tour.getPrice()) + "đ");
//        Picasso.get().load("http://192.168.1.12:4000/" + tour.getImageAvatar().substring(7)).into(holder.imageTour);
//        holder.nameTour.setText(tour.getNameTour());
//        holder.price.setText(Integer.toString(tour.getPrice()) + "đ");
    }

    @Override
    public int getItemCount() {
        return tours == null ? 0 : tours.size();
    }

    public class TourViewHolder extends RecyclerView.ViewHolder{
        private TextView nameTour;
        private TextView price;
        private ImageView imageTour;
        public TourViewHolder(@NonNull View itemView) {
            super(itemView);
            nameTour = itemView.findViewById(R.id.tv_name_tour);
            price = itemView.findViewById(R.id.tv_price);
            imageTour = itemView.findViewById(R.id.image_tour);
        }
    }
}
